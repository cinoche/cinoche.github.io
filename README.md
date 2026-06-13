# Cinoche

**Live app:** <https://cinoche.github.io>

Cinoche is a media launcher optimized for the Tesla in-car browser. It presents streaming, TV, sports, music, games, and utility services as a grid of tiles you can tap directly from the driver or passenger seat. The interface is bilingual (English / French) and persists your preferences and recently used apps across sessions.

---

## Features

- **Tile grid by category** — Streaming, TV, Sports, Music, Games, Tools
- **Recently Used row** — the apps you launch most often appear at the top on your next visit, stored locally in the browser
- **Instant search** — filter tiles by name, or type a URL / search query and press Enter to navigate directly
- **Fullscreen mode** — tap the fullscreen button in the upper-right corner to enter Tesla theater (fullscreen) mode via a YouTube redirect; one additional tap on the YouTube page is required to confirm
- **Animated backgrounds** — Gradient, Stars, Road, Aurora, Grid, or Random
- **Bilingual UI** — English and French, remembered per device
- **PWA** — installs as a web app and loads instantly even on a weak signal
- **Deep-link URL launcher** — open any site directly: `https://cinoche.github.io/?url=https://example.com`

---

## Requesting a New Service

If a streaming service, app, or website is missing, [open an issue](https://github.com/cinoche/cinoche.github.io/issues/new) and include:

- The **name** of the service
- Its **URL** (the direct link to the player or home page, not a marketing page)
- The **category** it belongs to (Streaming, TV, Sports, Music, Games, or Tools)

Please check the [existing issues](https://github.com/cinoche/cinoche.github.io/issues) first to avoid duplicates.

---

## Current Services

| Category | Services |
|---|---|
| Streaming | Netflix, Prime Video, Disney+, Apple TV+, Crave, Max, Hulu, Peacock, Paramount+, Plex, Tou.TV, CBC Gem, Pluto TV, Tubi, Crunchyroll, TikTok, YouTube |
| TV | Bell Fibe TV, Helix TV, Citytv+, TVA+, YouTube TV, Sling |
| Sports | DAZN, Twitch, TSN, RDS, FuboTV |
| Music | YouTube Music, Ohdio, TuneIn |
| Games | Chess.com, Poki, GeForce Now, Xbox Cloud |
| Tools | Google Maps, Waze Live Map, ABRP, PlugShare, Windy, MétéoMédia, Yelp, Reddit |

---

## Tech Stack

[Vite](https://vite.dev) + [Svelte 5](https://svelte.dev) + TypeScript + [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)

## Development

```bash
npm install
npm run dev      # development server
npm run check    # svelte-check + tsc
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

Deployment to GitHub Pages is automatic on every push to `main` via `.github/workflows/deploy.yml`.

### Adding a service

1. Add an entry to `src/lib/data/services.ts`
2. Drop a logo (PNG, ideally square, 256 px or larger) into `public/logos/`
3. Run `node scripts/make-cards.mjs` to generate the 1280×720 card artwork in `public/cards/`
4. Commit all three files

### Generating card artwork

```bash
node scripts/make-cards.mjs
```

This script reads logos from `public/logos/` and produces blurred, dark-tinted card backgrounds in `public/cards/`. It requires [sharp](https://sharp.pixelplumbing.com/) (`npm install` covers it).
