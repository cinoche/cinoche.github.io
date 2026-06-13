<script lang="ts">
  import { i18n } from '../i18n.svelte'
  import { recents } from '../recents.svelte'
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
  let bgOpen = $state(false)
  let langOpen = $state(false)
  let fsRedirecting = $state(false)
  let showFsTip = $state(!localStorage.getItem('cinoche-fs-seen'))

  function closeMenu() {
    menuOpen = false
    bgOpen = false
    langOpen = false
  }

  function dismissFsTip() {
    showFsTip = false
    localStorage.setItem('cinoche-fs-seen', '1')
  }

  function handleFullscreen() {
    dismissFsTip()
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

        <!-- Background sub-menu -->
        <button
          class="menu-item submenu-toggle"
          class:open={bgOpen}
          onclick={() => { bgOpen = !bgOpen; langOpen = false }}
          role="menuitem"
          aria-expanded={bgOpen}
        >
          {i18n.t('bg.title')}
          <svg class="chevron" class:rotated={bgOpen} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        {#if bgOpen}
          {#each backgrounds as bg}
            <button
              class="menu-item menu-subitem"
              class:active={settings.background === bg}
              onclick={() => { settings.setBackground(bg); closeMenu() }}
              role="menuitem"
            >
              {i18n.t(`bg.${bg}` as any)}
            </button>
          {/each}
        {/if}

        <div class="divider"></div>

        <!-- Language sub-menu -->
        <button
          class="menu-item submenu-toggle"
          class:open={langOpen}
          onclick={() => { langOpen = !langOpen; bgOpen = false }}
          role="menuitem"
          aria-expanded={langOpen}
        >
          {i18n.t('menu.language')}
          <svg class="chevron" class:rotated={langOpen} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        {#if langOpen}
          {#each (['en', 'fr'] as const) as locale}
            <button
              class="menu-item menu-subitem"
              class:active={i18n.locale === locale}
              onclick={() => { if (i18n.locale !== locale) i18n.toggle(); closeMenu() }}
              role="menuitem"
            >
              {locale === 'en' ? 'English' : 'Français'}
            </button>
          {/each}
        {/if}

        <div class="divider"></div>

        <button
          class="menu-item"
          onclick={() => { onShowInfo(); closeMenu() }}
          role="menuitem"
        >
          {i18n.t('info.title')}
        </button>

        {#if recents.ids.length > 0}
          <div class="divider"></div>
          <button
            class="menu-item menu-item-danger"
            onclick={() => { recents.clear(); closeMenu() }}
            role="menuitem"
          >
            {i18n.t('recent.clear')}
          </button>
        {/if}

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

    {#if showFsTip}
      <button class="fs-tip" onclick={dismissFsTip} aria-label="Dismiss tip">
        <span class="fs-tip-arrow" aria-hidden="true"></span>
        {i18n.t('fs.tip')}
      </button>
    {/if}
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
    min-width: 220px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .menu-item {
    width: 100%;
    text-align: left;
    padding: 11px 14px;
    font-size: 19px;
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

  .menu-item-danger {
    color: #f87171;
  }

  .menu-item-danger:hover {
    background: color-mix(in srgb, #f87171 15%, transparent);
  }

  .submenu-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .chevron {
    flex-shrink: 0;
    color: var(--muted);
    transition: transform 0.2s ease;
  }

  .chevron.rotated {
    transform: rotate(90deg);
  }

  .menu-subitem {
    padding-left: 30px;
    font-size: 17px;
    color: var(--muted);
  }

  .menu-subitem.active {
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
    position: relative;
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

  .fs-tip {
    position: absolute;
    top: calc(100% + 16px);
    right: 0;
    z-index: 200;
    padding: 14px 20px;
    font-size: 16px;
    font-weight: 500;
    white-space: nowrap;
    color: var(--text);
    background: rgba(21, 27, 41, 0.88);
    backdrop-filter: blur(14px);
    border: 1px solid var(--accent);
    border-radius: var(--radius-card);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(125, 190, 255, 0.15);
    cursor: pointer;
    animation: tip-in 0.3s ease both, tip-pulse 2.4s ease-in-out 0.4s infinite;
  }

  .fs-tip-arrow {
    position: absolute;
    top: -9px;
    right: 16px;
    width: 0;
    height: 0;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 9px solid var(--accent);
  }

  .fs-tip-arrow::after {
    content: '';
    position: absolute;
    top: 2px;
    left: -8px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid rgba(21, 27, 41, 0.88);
  }

  @keyframes tip-in {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes tip-pulse {
    0%, 100% { box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(125, 190, 255, 0.15); }
    50%       { box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5), 0 0 12px 3px rgba(125, 190, 255, 0.35); }
  }
</style>
