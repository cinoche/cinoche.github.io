<script lang="ts">
  import type { Service } from '../data/services'

  let { service }: { service: Service } = $props()
</script>

<a class="tile" href={service.url}>
  <img src={service.logo} alt={service.name} loading="lazy" />
  <span>{service.name}</span>
</a>

<style>
  .tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 22px 14px 16px;
    min-height: 170px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text);
    transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease;
  }

  .tile:hover,
  .tile:focus-visible {
    background: var(--surface-raised);
    border-color: var(--accent);
    transform: translateY(-3px);
    outline: none;
  }

  .tile:active {
    transform: scale(0.96);
  }

  img {
    width: 110px;
    height: 78px;
    object-fit: contain;
  }

  span {
    font-size: 15px;
    color: var(--muted);
  }
</style>
