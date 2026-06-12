// Generates 800x450 card artwork in public/cards/ for every service.
// Sources: tmp-cards/<id>.img (harvested og:image promo art) when present
// and landscape; otherwise a branded gradient card is built from the
// service logo's dominant colour.
//
// Usage: node scripts/make-cards.mjs
import { readdirSync, existsSync } from 'node:fs'
import sharp from 'sharp'

const W = 800
const H = 450

// og images that are landscape promo art worth using directly
const useOg = new Set([
  'disneyplus', 'plex', 'prime', 'toutv', 'gem', 'pluto', 'appletv',
  'twitch', 'chess', 'poki', 'waze', 'windy', 'yelp',
])

const logos = readdirSync('public/logos').filter((f) => f.endsWith('.png'))

async function dominantColor(path) {
  const { dominant } = await sharp(path).stats()
  return dominant
}

function shade({ r, g, b }, f) {
  const c = (v) => Math.max(0, Math.min(255, Math.round(v * f)))
  return `rgb(${c(r)},${c(g)},${c(b)})`
}

async function gradientCard(id, logoPath) {
  const dom = await dominantColor(logoPath)
  // keep the gradient dark enough that white text stays readable
  const top = shade(dom, 0.55)
  const bottom = shade(dom, 0.18)
  const bg = Buffer.from(`<svg width="${W}" height="${H}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${top}"/>
        <stop offset="1" stop-color="${bottom}"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.75" cy="0.25" r="0.9">
        <stop offset="0" stop-color="rgba(255,255,255,0.16)"/>
        <stop offset="1" stop-color="rgba(255,255,255,0)"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
  </svg>`)
  const logo = await sharp(logoPath)
    .resize(Math.round(W * 0.42), Math.round(H * 0.52), { fit: 'inside' })
    .png()
    .toBuffer()
  return sharp(bg).composite([{ input: logo, gravity: 'center' }])
}

for (const f of logos) {
  const id = f.replace('.png', '')
  const og = `tmp-cards/${id}.img`
  let img
  if (useOg.has(id) && existsSync(og)) {
    img = sharp(og).resize(W, H, { fit: 'cover', position: 'attention' })
  } else {
    img = await gradientCard(id, `public/logos/${f}`)
  }
  await img.jpeg({ quality: 78 }).toFile(`public/cards/${id}.jpg`)
  console.log('card:', id)
}
