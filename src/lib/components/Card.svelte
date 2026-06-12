<script lang="ts">
  import { cardFor, type Service } from '../data/services'

  let { service }: { service: Service } = $props()
</script>

<a class="card" href={service.url}>
  <img class="art" src={cardFor(service)} alt="" loading="lazy" />
  <div class="scrim"></div>
  <div class="caption">
    <img class="logo" src={service.logo} alt="" loading="lazy" />
    <span>{service.name}</span>
  </div>
</a>

<style>
  .card {
    position: relative;
    flex: 0 0 auto;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: var(--radius);
    overflow: hidden;
    border: 1px solid var(--border);
    background: var(--surface);
    scroll-snap-align: start;
    transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  }

  .card:hover,
  .card:focus-visible {
    transform: scale(1.035);
    border-color: var(--accent);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
    outline: none;
    z-index: 1;
  }

  .card:active {
    transform: scale(0.98);
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
