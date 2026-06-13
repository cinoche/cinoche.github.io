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
      <span class="fx" aria-hidden="true"><span class="glow"></span></span>
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
    position: relative;
    padding: 12px 26px;
    min-height: 52px;
    font-size: 17px;
    color: var(--muted);
    background: rgba(21, 27, 41, 0.55);
    backdrop-filter: blur(12px);
    border: none;
    border-radius: var(--radius-card);
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.35);
    transition: color 0.15s ease, transform 0.18s ease;
  }

  button:hover {
    color: var(--text);
    transform: scale(1.035);
  }

  button.active {
    color: var(--text);
    background: rgba(59, 130, 246, 0.18);
  }

  .fx {
    position: absolute;
    inset: -34px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.25s ease;
    border-radius: calc(var(--radius-card) + 3px);
  }

  button:hover .fx {
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
