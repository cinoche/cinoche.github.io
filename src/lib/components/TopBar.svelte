<script lang="ts">
  import { i18n } from '../i18n.svelte'
  import { settings, backgrounds, type Background } from '../settings.svelte'
  import { goFullscreen } from '../tesla'

  let {
    query = $bindable(),
    onShowInfo,
  }: {
    query: string
    onShowInfo: () => void
  } = $props()

  let menuOpen = $state(false)

  function closeMenu() {
    menuOpen = false
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
      </div>
    {/if}
  </div>

  <input
    type="search"
    placeholder={i18n.t('search')}
    bind:value={query}
    aria-label={i18n.t('search')}
  />

  <div class="actions">
    <button
      class="fullscreen"
      onclick={goFullscreen}
      aria-label={i18n.t('fullscreen')}
      title={i18n.t('fullscreen')}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2 8V2h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M20 8V2h-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 14v6h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M20 14v6h-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <button class="info" onclick={onShowInfo} aria-label={i18n.t('info.title')}>
      i
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
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 52px;
    min-height: 52px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 999px;
    color: var(--muted);
    transition: color 0.15s ease, border-color 0.15s ease;
  }

  .hamburger:hover {
    color: var(--text);
    border-color: var(--accent);
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    z-index: 100;
    min-width: 180px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
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
    border-radius: 10px;
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

  input {
    flex: 1;
    min-width: 120px;
    padding: 14px 22px;
    font-size: 17px;
    color: var(--text);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 999px;
    outline: none;
    transition: border-color 0.15s ease;
  }

  input::placeholder {
    color: var(--muted);
  }

  input:focus {
    border-color: var(--accent);
  }

  .actions {
    display: flex;
    gap: 10px;
  }

  .actions button {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 52px;
    min-height: 52px;
    font-size: 17px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 999px;
    color: var(--muted);
    transition: color 0.15s ease, border-color 0.15s ease;
  }

  .actions button:hover {
    color: var(--text);
    border-color: var(--accent);
  }

  .info {
    font-style: italic;
    font-family: Georgia, serif;
  }
</style>
