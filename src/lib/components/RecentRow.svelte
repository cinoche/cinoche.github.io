<script lang="ts">
  import { services } from '../data/services'
  import { i18n } from '../i18n.svelte'
  import { recents } from '../recents.svelte'
  import Card from './Card.svelte'
  import Hero from './Hero.svelte'

  const recentServices = $derived(
    recents.ids
      .map((id) => services.find((s) => s.id === id))
      .filter((s) => s !== undefined),
  )

  let rowEl = $state<HTMLDivElement | null>(null)
  let canScrollLeft = $state(false)
  let canScrollRight = $state(false)

  function checkScroll() {
    if (!rowEl) return
    canScrollLeft = rowEl.scrollLeft > 4
    canScrollRight = rowEl.scrollLeft < rowEl.scrollWidth - rowEl.clientWidth - 4
  }

  function scrollLeft() {
    rowEl?.scrollBy({ left: -rowEl.clientWidth * 0.75, behavior: 'smooth' })
  }

  function scrollRight() {
    rowEl?.scrollBy({ left: rowEl.clientWidth * 0.75, behavior: 'smooth' })
  }

  $effect(() => {
    if (!rowEl) return
    checkScroll()
    const ro = new ResizeObserver(checkScroll)
    ro.observe(rowEl)
    return () => ro.disconnect()
  })
</script>

{#if recentServices.length > 0}
  <section>
    <h2>{i18n.t('recent.title')}</h2>
    <div class="row" bind:this={rowEl} onscroll={checkScroll}>
      {#each recentServices as service (service.id)}
        <Card {service} />
      {/each}
    </div>

    {#if canScrollLeft}
      <button class="arrow arrow-left" onclick={scrollLeft} aria-label="Scroll left">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M13 4l-6 6 6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    {/if}

    {#if canScrollRight}
      <button class="arrow arrow-right" onclick={scrollRight} aria-label="Scroll right">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M7 4l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    {/if}
  </section>
{:else}
  <Hero />
{/if}

<style>
  section {
    position: relative;
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

  .row {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-snap-type: x proximity;
    scroll-padding: 68px;
    padding: 68px 68px 80px;
    margin: -68px -68px -66px;
    scrollbar-width: none;
  }

  .row :global(.card) {
    width: clamp(220px, 16vw, 360px);
  }

  .row::-webkit-scrollbar {
    display: none;
  }

  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 44px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: var(--radius-card);
    background: rgba(11, 14, 22, 0.72);
    backdrop-filter: blur(10px);
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    transition: background 0.18s ease, color 0.18s ease;
  }

  .arrow:hover {
    background: rgba(59, 130, 246, 0.45);
    color: #fff;
  }

  .arrow-left  { left: 0; }
  .arrow-right { right: 0; }
</style>
