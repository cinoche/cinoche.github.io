<!-- Hover effect: a soft pulsating glow behind the tile (rendered
     before .inner, so the card sits on top of it) plus a faint border
     ring. Gradient-based, no blur filters. Shown via .card:hover in
     the parent. -->
<div class="fx" aria-hidden="true">
  <div class="glow"></div>
  <div class="ring"></div>
</div>

<style>
  .fx {
    position: absolute;
    inset: -34px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  :global(.card:hover) > .fx,
  :global(.card:focus-visible) > .fx {
    opacity: 1;
  }

  /* card-shaped glow: box-shadow hugs the tile's outline and corners */
  .glow {
    position: absolute;
    inset: 31px;
    border-radius: calc(var(--radius-card) + 3px);
    box-shadow:
      0 0 18px 5px rgba(125, 190, 255, 0.85),
      0 0 48px 18px rgba(94, 177, 255, 0.45);
    will-change: transform, opacity;
    animation: breathe 2.8s ease-in-out infinite alternate;
  }

  @keyframes breathe {
    from {
      transform: scale(0.985);
      opacity: 0.6;
    }
    to {
      transform: scale(1.03);
      opacity: 1;
    }
  }

  .ring {
    position: absolute;
    inset: 31px;
    border-radius: calc(var(--radius-card) + 3px);
    border: 1px solid rgba(140, 195, 255, 0.35);
    box-shadow: 0 0 16px rgba(94, 177, 255, 0.2);
    animation: ringpulse 2.8s ease-in-out infinite alternate;
  }

  @keyframes ringpulse {
    from {
      opacity: 0.55;
    }
    to {
      opacity: 1;
    }
  }
</style>
