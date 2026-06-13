<script lang="ts">
  import { i18n } from '../i18n.svelte'
  import { settings, backgrounds } from '../settings.svelte'
  import { goFullscreen, searchOrNavigate } from '../tesla'

  let {
    query = $bindable(),
    onShowInfo,
  }: {
    query: string
    onShowInfo: () => void
  } = $props()

  let menuOpen = $state(false)
  let fsRedirecting = $state(false)

  function closeMenu() {
    menuOpen = false
  }

  function handleFullscreen() {
    fsRedirecting = true
    setTimeout(goFullscreen, 700)
  }
</script>

<svelte:window onclick={(e) => { if (menuOpen && !(e.target as Element).closest('.menu-wrap')) closeMenu() }} />

<header>
  <div class="menu-wrap">
    <button
      class="hamburger"
      onclick={() => (menuOpen = !menuOpen)}
      aria-label="Menu"
      aria-expanded={menuOpen}
    >
      <span class="fx" aria-hidden="true"><span class="glow"></span></span>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="2" y="4" width="18" height="2.2" rx="1.1" fill="currentColor"/>
        <rect x="2" y="9.9" width="18" height="2.2" rx="1.1" fill="currentColor"/>
        <rect x="2" y="15.8" width="18" height="2.2" rx="1.1" fill="currentColor"/>
      </svg>
    </button>

    {#if menuOpen}
      <div class="dropdown" role="menu">
        <div class="section-label">{i18n.t('bg.title')}</div>
        {#each backgrounds as bg}
          <button
            class="menu-item"
            class:active={settings.background === bg}
            onclick={() => { settings.setBackground(bg); closeMenu() }}
            role="menuitem"
          >
            {i18n.t(`bg.${bg}` as any)}
          </button>
        {/each}

        <div class="divider"></div>

        <button
          class="menu-item"
          onclick={() => { i18n.toggle(); closeMenu() }}
          role="menuitem"
        >
          {i18n.locale === 'fr' ? 'English' : 'Français'}
        </button>

        <div class="divider"></div>

        <button
          class="menu-item"
          onclick={() => { onShowInfo(); closeMenu() }}
          role="menuitem"
        >
          {i18n.t('info.title')}
        </button>
      </div>
    {/if}
  </div>

  <div class="search-wrap">
    <input
      type="search"
      placeholder={i18n.t('search')}
      bind:value={query}
      aria-label={i18n.t('search')}
      onkeydown={(e) => { if (e.key === 'Enter' && query.trim()) searchOrNavigate(query) }}
    />
    {#if query.trim()}
      <span class="search-hint" aria-hidden="true">↵</span>
    {/if}
  </div>

  <div class="actions">
    <button
      class="fullscreen"
      class:redirecting={fsRedirecting}
      onclick={handleFullscreen}
      disabled={fsRedirecting}
      aria-label={i18n.t('fullscreen')}
      title={i18n.t('fullscreen')}
    >
      <span class="fx" aria-hidden="true"><span class="glow"></span></span>
      {#if fsRedirecting}
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" stroke-dasharray="16 34" stroke-linecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0 11 11" to="360 11 11" dur="0.8s" repeatCount="indefinite"/>
          </circle>
        </svg>
      {:else}
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M2 8V2h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20 8V2h-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 14v6h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20 14v6h-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      {/if}
    </button>
  </div>
</header>

<style>
  header {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .menu-wrap {
    position: relative;
  }

  .hamburger {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 52px;
    min-height: 52px;
    background: rgba(21, 27, 41, 0.55);
    backdrop-filter: blur(12px);
    border: none;
    border-radius: var(--radius-card);
    color: var(--muted);
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.35);
    transition: color 0.15s ease, transform 0.18s ease;
  }

  .hamburger:hover {
    color: var(--text);
    transform: scale(1.035);
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    z-index: 100;
    min-width: 180px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .section-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    padding: 6px 12px 4px;
  }

  .menu-item {
    width: 100%;
    text-align: left;
    padding: 10px 12px;
    font-size: 15px;
    background: transparent;
    border: none;
    border-radius: var(--radius-card);
    color: var(--text);
    transition: background 0.12s ease;
  }

  .menu-item:hover {
    background: color-mix(in srgb, var(--accent) 15%, transparent);
  }

  .menu-item.active {
    color: var(--accent);
    font-weight: 600;
  }

  .divider {
    height: 1px;
    background: var(--border);
    margin: 6px 8px;
  }

  .search-wrap {
    position: relative;
    flex: 1;
    min-width: 120px;
  }

  input {
    width: 100%;
    padding: 14px 52px 14px 22px;
    font-size: 17px;
    color: var(--text);
    background: rgba(21, 27, 41, 0.55);
    backdrop-filter: blur(12px);
    border: none;
    border-radius: var(--radius-card);
    outline: none;
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.35);
    transition: box-shadow 0.15s ease;
  }

  input::placeholder {
    color: var(--muted);
  }

  input:focus {
    box-shadow: 0 0 18px 5px rgba(125, 190, 255, 0.6), 0 0 48px 18px rgba(94, 177, 255, 0.3);
  }

  .search-hint {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    color: var(--muted);
    pointer-events: none;
    opacity: 0.7;
  }

  .actions {
    display: flex;
    gap: 10px;
  }

  .actions button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 52px;
    min-height: 52px;
    font-size: 17px;
    background: rgba(21, 27, 41, 0.55);
    backdrop-filter: blur(12px);
    border: none;
    border-radius: var(--radius-card);
    color: var(--muted);
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.35);
    transition: color 0.15s ease, transform 0.18s ease;
  }

  .actions button:hover {
    color: var(--text);
    transform: scale(1.035);
  }

  .actions button.redirecting {
    opacity: 0.6;
    transform: scale(0.95);
    cursor: default;
  }

  /* Glow effect — mirrors CardFx: .fx is the visibility wrapper, .glow animates freely */
  .fx {
    position: absolute;
    inset: -34px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  .hamburger:hover .fx,
  .actions button:hover .fx {
    opacity: 1;
  }

  .glow {
    position: absolute;
    inset: 31px;
    border-radius: calc(var(--radius-card) + 3px);
    box-shadow:
      0 0 18px 5px rgba(125, 190, 255, 0.85),
      0 0 48px 18px rgba(94, 177, 255, 0.45);
    animation: breathe 2.8s ease-in-out infinite alternate;
  }

  @keyframes breathe {
    from { transform: scale(0.985); opacity: 0.6; }
    to   { transform: scale(1.03);  opacity: 1; }
  }
</style>
