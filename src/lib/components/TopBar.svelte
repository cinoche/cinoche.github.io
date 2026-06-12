<script lang="ts">
  import { i18n } from '../i18n.svelte'

  let {
    query = $bindable(),
    onShowInfo,
  }: {
    query: string
    onShowInfo: () => void
  } = $props()
</script>

<header>
  <div class="brand">
    <img src="/favicon.svg" alt="" />
    <h1>Cinoche</h1>
  </div>

  <input
    type="search"
    placeholder={i18n.t('search')}
    bind:value={query}
    aria-label={i18n.t('search')}
  />

  <div class="actions">
    <button class="lang" onclick={i18n.toggle}>
      {i18n.locale === 'fr' ? 'EN' : 'FR'}
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

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .brand img {
    width: 44px;
    height: 44px;
  }

  h1 {
    margin: 0;
    font-size: 26px;
    font-weight: 600;
    letter-spacing: 0.4px;
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
