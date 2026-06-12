<script lang="ts">
  import { matchesQuery, services, type Category } from '../data/services'
  import { i18n } from '../i18n.svelte'
  import Card from './Card.svelte'
  import CardFx from './CardFx.svelte'

  let {
    category,
    query,
    layout = 'row',
    onLaunchUrl,
  }: {
    category: Category
    query: string
    layout?: 'row' | 'grid'
    onLaunchUrl: () => void
  } = $props()

  const filtered = $derived(
    services.filter((s) => s.category === category && matchesQuery(s, query)),
  )

  const showCustomUrlCard = $derived(category === 'tools' && !query.trim())
</script>

{#if filtered.length > 0 || showCustomUrlCard}
  <section>
    <h2>{i18n.t(`cat.${category}`)}</h2>
    <div class={layout}>
      {#each filtered as service (service.id)}
        <Card {service} />
      {/each}
      {#if showCustomUrlCard}
        <button class="card" onclick={onLaunchUrl}>
          <CardFx />
          <div class="inner">
            <img class="art" src="cards/chromium.jpg" alt="" loading="lazy" />
            <div class="scrim"></div>
            <div class="caption">
              <img class="logo" src="logos/chromium.png" alt="" loading="lazy" />
              <span>{i18n.t('tile.customUrl')}</span>
            </div>
          </div>
        </button>
      {/if}
    </div>
  </section>
{/if}

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-width: 0;
  }

  h2 {
    margin: 0;
    font-size: 21px;
    font-weight: 700;
    letter-spacing: 0.3px;
  }

  .row :global(.card) {
    width: clamp(220px, 16vw, 360px);
  }

  /* generous padding (offset by negative margins) so hover rings and
     the scale effect aren't clipped by the scroll container */
  .row {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-snap-type: x proximity;
    scroll-padding: 24px;
    padding: 24px 24px 44px;
    margin: -24px -24px -30px;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
    padding: 12px;
    margin: -12px;
  }

  /* the custom-URL button mirrors Card.svelte: static outer for
     layout/snap, transforming inner for the hover effect */
  .card {
    position: relative;
    flex: 0 0 auto;
    width: clamp(220px, 16vw, 360px);
    aspect-ratio: 16 / 9;
    scroll-snap-align: start;
    padding: 0;
  }

  .grid .card {
    width: auto;
  }

  .card:hover,
  .card:focus-visible {
    outline: none;
    z-index: 1;
  }

  .inner {
    position: absolute;
    inset: 0;
    border-radius: var(--radius-card);
    overflow: hidden;
    border: 1px dashed var(--border);
    background: var(--surface);
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.35);
    transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  }

  .card:hover .inner,
  .card:focus-visible .inner {
    transform: scale(1.035);
    border-color: var(--accent);
    box-shadow:
      0 8px 22px rgba(0, 0, 0, 0.35),
      0 18px 50px rgba(0, 0, 0, 0.4);
  }

  .art {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.55;
  }

  .scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(5, 8, 14, 0.88) 0%,
      rgba(5, 8, 14, 0.25) 38%,
      rgba(5, 8, 14, 0) 60%
    );
  }

  .caption {
    position: absolute;
    left: 14px;
    right: 14px;
    bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }

  .caption span {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.8);
  }
</style>
