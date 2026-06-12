// Generates 1280x720 card artwork in public/cards/ for every service.
// Sources: tmp-cards/<id>.img (harvested og:image promo art) when present
// and landscape; otherwise a rich branded card is composed from the
// service logo: palette extracted from the logo's saturated pixels,
// glow + geometric pattern (variant picked by id hash), an oversized
// screen-blended ghost of the logo, and the logo itself centered.
//
// Usage: node scripts/make-cards.mjs   (needs tmp-cards/ only for og art)
import { readdirSync, existsSync } from 'node:fs'
import sharp from 'sharp'

const W = 1280
const H = 720

// og images that are landscape promo art worth using directly
const useOg = new Set([
  'disneyplus', 'plex', 'prime', 'toutv', 'gem', 'pluto', 'appletv',
  'twitch', 'chess', 'poki', 'waze', 'windy', 'yelp',
])

const logos = readdirSync('public/logos').filter((f) => f.endsWith('.png'))

const hashOf = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)

// per-service tweaks: logo box colours that aren't near-black, brand
// hues the logo doesn't carry, and bespoke pattern picks
const BOX_DARK_MAX = { tsn: 115 }
const HUE_OVERRIDE = { tsn: 358 }
const PATTERN_OVERRIDE = { tsn: 'sports' }

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, l]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g) h = ((b - r) / d + 2) / 6
  else h = ((r - g) / d + 4) / 6
  return [h * 360, s, l]
}

// Many legacy logos are bright marks on an opaque black box (designed
// for the old black page). Detect those by their borders and convert
// near-black to transparency so they composite like real wordmarks.
async function cleanLogo(logoPath, darkMax = 45) {
  const { data, info } = await sharp(logoPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const w = info.width
  const h = info.height
  const px = (x, y) => (y * w + x) * 4
  let dark = 0
  let count = 0
  const check = (i) => {
    if (data[i + 3] > 200) {
      count++
      if (Math.max(data[i], data[i + 1], data[i + 2]) < darkMax) dark++
    }
  }
  for (let x = 0; x < w; x += Math.max(1, w >> 5)) {
    check(px(x, 0))
    check(px(x, h - 1))
  }
  for (let y = 0; y < h; y += Math.max(1, h >> 5)) {
    check(px(0, y))
    check(px(w - 1, y))
  }
  const boxed = count > 0 && dark / count > 0.7
  if (!boxed) return sharp(logoPath).png().toBuffer()
  for (let i = 0; i < data.length; i += 4) {
    const m = Math.max(data[i], data[i + 1], data[i + 2])
    const lifted = Math.max(0, m - (darkMax > 45 ? darkMax : 0))
    data[i + 3] = Math.min(data[i + 3], Math.min(255, Math.round((darkMax > 45 ? lifted * 2.2 : m * 1.6))))
  }
  return sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toBuffer()
}

// dominant saturated hue from the logo, plus how much of it is opaque
async function analyse(logoInput) {
  const { data, info } = await sharp(logoInput)
    .resize(48, 48, { fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const buckets = new Map()
  let opaque = 0
  const total = info.width * info.height
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3]
    if (a < 128) continue
    opaque++
    const [h, s, l] = rgbToHsl(data[i], data[i + 1], data[i + 2])
    if (s < 0.3 || l < 0.12 || l > 0.92) continue
    const b = Math.round(h / 24) * 24
    buckets.set(b, (buckets.get(b) ?? 0) + s)
  }
  const top = [...buckets.entries()].sort((x, y) => y[1] - x[1])[0]
  return {
    hue: top ? top[0] : 222, // slate fallback for monochrome logos
    colored: !!top,
    coverage: opaque / total,
  }
}

function patternSvg(variant, hue) {
  const c = (a) => `hsla(${hue}, 70%, 60%, ${a})`
  switch (variant) {
    case 'sports': // stadium floodlights + rink/pitch geometry + ball arc
      return `<g>
        <polygon points="0,0 ${W * 0.3},0 ${W * 0.52},${H}" fill="rgba(255,255,255,0.05)"/>
        <polygon points="${W},0 ${W * 0.72},0 ${W * 0.45},${H}" fill="rgba(255,255,255,0.04)"/>
        <g fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="3">
          <circle cx="${W * 0.82}" cy="${H * 0.78}" r="150"/>
          <circle cx="${W * 0.82}" cy="${H * 0.78}" r="46"/>
          <line x1="${W * 0.82}" y1="${H * 0.3}" x2="${W * 0.82}" y2="${H * 1.1}"/>
        </g>
        <circle cx="${W * 0.82}" cy="${H * 0.78}" r="10" fill="${c(0.5)}"/>
        <path d="M ${W * 0.04} ${H * 0.9} Q ${W * 0.22} ${H * 0.38} ${W * 0.46} ${H * 0.62}"
          fill="none" stroke="${c(0.45)}" stroke-width="4" stroke-dasharray="2 18" stroke-linecap="round"/>
        <circle cx="${W * 0.46}" cy="${H * 0.62}" r="9" fill="rgba(255,255,255,0.5)"/>
        <g stroke="${c(0.25)}" stroke-width="3" stroke-linecap="round">
          <line x1="${W * 0.05}" y1="${H * 0.18}" x2="${W * 0.16}" y2="${H * 0.15}"/>
          <line x1="${W * 0.03}" y1="${H * 0.24}" x2="${W * 0.18}" y2="${H * 0.2}"/>
          <line x1="${W * 0.06}" y1="${H * 0.3}" x2="${W * 0.15}" y2="${H * 0.27}"/>
        </g>
      </g>`
    case 0: // rings
      return `<g fill="none" stroke="${c(0.10)}" stroke-width="3">
        <circle cx="${W * 0.85}" cy="${H * 0.2}" r="170"/>
        <circle cx="${W * 0.85}" cy="${H * 0.2}" r="260"/>
        <circle cx="${W * 0.85}" cy="${H * 0.2}" r="350"/>
      </g>`
    case 1: // diagonal beams
      return `<g fill="${c(0.07)}">
        <polygon points="0,${H} ${W * 0.45},0 ${W * 0.62},0 ${W * 0.17},${H}"/>
        <polygon points="${W * 0.3},${H} ${W * 0.75},0 ${W * 0.83},0 ${W * 0.38},${H}"/>
      </g>`
    case 2: // dot grid
      return `<defs><pattern id="d" width="64" height="64" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="6" r="3.5" fill="${c(0.13)}"/>
        </pattern></defs>
        <rect x="${W * 0.55}" y="0" width="${W * 0.45}" height="${H}" fill="url(#d)"/>`
    case 3: // waves
      return `<g fill="none" stroke="${c(0.11)}" stroke-width="3.5">
        <path d="M-50 ${H * 0.78} Q ${W * 0.25} ${H * 0.62} ${W * 0.5} ${H * 0.76} T ${W + 50} ${H * 0.7}"/>
        <path d="M-50 ${H * 0.88} Q ${W * 0.25} ${H * 0.72} ${W * 0.5} ${H * 0.86} T ${W + 50} ${H * 0.8}"/>
      </g>`
    default: // corner arcs
      return `<g fill="none" stroke="${c(0.10)}" stroke-width="3">
        <circle cx="0" cy="${H}" r="${H * 0.55}"/>
        <circle cx="0" cy="${H}" r="${H * 0.8}"/>
        <circle cx="0" cy="${H}" r="${H * 1.05}"/>
      </g>`
  }
}

async function brandedCard(id, logoPath) {
  const logo = await cleanLogo(logoPath, BOX_DARK_MAX[id])
  const analysed = await analyse(logo)
  const hue = HUE_OVERRIDE[id] ?? analysed.hue
  const colored = HUE_OVERRIDE[id] !== undefined || analysed.colored
  const { coverage } = analysed
  const h = hashOf(id)
  const variant = PATTERN_OVERRIDE[id] ?? h % 5
  const glowX = 0.25 + ((h >> 3) % 50) / 100 // 0.25 - 0.75
  const sat = colored ? 45 : 25
  const bg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="hsl(${hue}, ${sat}%, 15%)"/>
        <stop offset="0.55" stop-color="hsl(${(hue + 18) % 360}, ${sat}%, 10%)"/>
        <stop offset="1" stop-color="hsl(${(hue + 32) % 360}, ${sat - 5}%, 6%)"/>
      </linearGradient>
      <radialGradient id="glow" cx="${glowX}" cy="0.28" r="0.75">
        <stop offset="0" stop-color="hsla(${hue}, 75%, 62%, 0.30)"/>
        <stop offset="0.55" stop-color="hsla(${hue}, 75%, 55%, 0.10)"/>
        <stop offset="1" stop-color="hsla(${hue}, 75%, 55%, 0)"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
    ${patternSvg(variant, hue)}
    <rect width="${W}" height="${H}" fill="none" stroke="hsla(${hue}, 60%, 65%, 0.12)" stroke-width="2"/>
  </svg>`)

  const layers = []

  // oversized ghost logo, screen-blended so dark/boxed pixels vanish;
  // skipped for fully-opaque app-icon logos where it would show a slab.
  // Rendered on an oversized canvas then cropped, so it can bleed off
  // the card edges (sharp composites must fit inside the base).
  if (coverage < 0.85) {
    const ghost = await sharp(logo)
      .resize({
        width: Math.round(W * 1.25),
        height: Math.round(H * 0.95),
        fit: 'inside',
      })
      .modulate({ brightness: 0.4 })
      .png()
      .toBuffer()
    const gm = await sharp(ghost).metadata()
    const big = await sharp({
      create: { width: W * 3, height: H * 3, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
    })
      .composite([
        {
          input: ghost,
          left: Math.round(W + W - gm.width * 0.62),
          top: Math.round(H + H * 0.3),
        },
      ])
      .png()
      .toBuffer()
    const ghostLayer = await sharp(big)
      .extract({ left: W, top: H, width: W, height: H })
      .png()
      .toBuffer()
    layers.push({ input: ghostLayer, blend: 'screen' })
  }

  const main = await sharp(logo)
    .resize(Math.round(W * 0.4), Math.round(H * 0.42), { fit: 'inside' })
    .png()
    .toBuffer()
  layers.push({ input: main, gravity: 'centre' })

  return sharp(bg).composite(layers)
}

// optional arg regenerates a single service: node scripts/make-cards.mjs tsn
const only = process.argv[2]

for (const f of logos) {
  const id = f.replace('.png', '')
  if (only && id !== only) continue
  const og = `tmp-cards/${id}.img`
  let img
  if (useOg.has(id)) {
    if (!existsSync(og)) {
      // don't silently downgrade promo-art cards to generated ones
      console.warn(`skip ${id}: og art missing in tmp-cards/ (re-harvest first)`)
      continue
    }
    img = sharp(og).resize(W, H, { fit: 'cover', position: 'attention' })
  } else {
    img = await brandedCard(id, `public/logos/${f}`)
  }
  await img.jpeg({ quality: 76 }).toFile(`public/cards/${id}.jpg`)
  console.log('card:', id)
}
