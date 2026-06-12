<script lang="ts">
  import { categories, type Category } from '../data/services'
  import { i18n } from '../i18n.svelte'

  let { active = $bindable() }: { active: Category | 'all' } = $props()

  const tabs: (Category | 'all')[] = ['all', ...categories]
</script>

<nav>
  {#each tabs as tab (tab)}
    <button
      class:active={active === tab}
      onclick={() => (active = tab)}
    >
      {i18n.t(`cat.${tab}`)}
    </button>
  {/each}
</nav>

<style>
  nav {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }

  button {
    padding: 12px 26px;
    min-height: 52px;
    font-size: 17px;
    color: var(--muted);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 999px;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  }

  button:hover {
    color: var(--text);
    border-color: var(--accent);
  }

  button.active {
    color: var(--text);
    background: var(--accent-soft);
    border-color: var(--accent);
  }
</style>
