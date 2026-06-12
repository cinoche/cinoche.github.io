<script lang="ts">
  import { cardFor, services } from '../data/services'
  import { i18n } from '../i18n.svelte'

  // services with strong promo artwork, rotated daily
  const featuredIds = [
    'disneyplus', 'appletv', 'plex', 'toutv', 'gem', 'pluto', 'twitch', 'prime',
  ]

  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000,
  )
  const featured = services.find(
    (s) => s.id === featuredIds[dayOfYear % featuredIds.length],
  )!
</script>

<a class="hero" href={featured.url}>
  <img class="art" src={cardFor(featured)} alt="" />
  <div class="scrim"></div>
  <div class="content">
    <p class="kicker">{i18n.t('hero.featured')}</p>
    <div class="title">
      <img src={featured.logo} alt="" />
      <h2>{featured.name}</h2>
    </div>
    <span class="cta">{i18n.t('hero.open')} →</span>
  </div>
</a>

<style>
  .hero {
    position: relative;
    display: block;
    height: clamp(220px, 34vh, 360px);
    border-radius: calc(var(--radius-card) + 4px);
    overflow: hidden;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.45);
    transition: box-shadow 0.18s ease;
  }

  .hero:hover,
  .hero:focus-visible {
    box-shadow:
      0 0 0 2px var(--accent),
      0 12px 36px rgba(0, 0, 0, 0.6);
    outline: none;
  }

  .art {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(7, 10, 18, 0.92) 0%,
      rgba(7, 10, 18, 0.55) 45%,
      rgba(7, 10, 18, 0.05) 80%
    );
  }

  .content {
    position: absolute;
    left: 36px;
    bottom: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .kicker {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--accent);
  }

  .title {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .title img {
    width: 52px;
    height: 52px;
    object-fit: contain;
  }

  h2 {
    margin: 0;
    font-size: clamp(26px, 4vw, 40px);
    font-weight: 700;
    color: #fff;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
  }

  .cta {
    font-size: 16px;
    font-weight: 600;
    color: var(--text);
    background: rgba(59, 130, 246, 0.25);
    border: 1px solid var(--accent);
    border-radius: 999px;
    padding: 10px 22px;
    width: fit-content;
    transition: background 0.18s ease;
  }

  .hero:hover .cta {
    background: var(--accent);
    color: #fff;
  }
</style>
