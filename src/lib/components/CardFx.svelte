<!-- Hover effect: a comet head travelling around the card border via
     CSS Motion Path, trailing dust particles that puff outward and fade.
     A faint rotating conic ring keeps the border defined. Shown via
     .card:hover in the parent. Browsers without offset-path support
     just get the ring. -->
<script lang="ts">
  const PERIOD = 2.4
  // trailing dust: progressively behind the head, smaller, puffing
  // outward on alternating sides
  const dust = Array.from({ length: 9 }, (_, i) => ({
    lag: 0.04 + i * 0.055,
    size: 5 - i * 0.4,
    out: (i % 2 ? 1 : -1) * (4 + i * 1.5),
    puff: 0.55 + (i % 3) * 0.18,
  }))
</script>

<div class="fx" aria-hidden="true">
  <div class="ring"></div>
  <span class="head" style="animation-duration: {PERIOD}s"></span>
  {#each dust as d, i (i)}
    <span
      class="dust"
      style="width:{d.size}px; height:{d.size}px; --out:{d.out}px;
             animation-duration: {PERIOD}s, {d.puff}s;
             animation-delay: {d.lag}s, 0s"
    ></span>
  {/each}
</div>

<style>
  .fx {
    position: absolute;
    inset: -3px;
    border-radius: calc(var(--radius-card) + 3px);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  :global(.card:hover) > .fx,
  :global(.card:focus-visible) > .fx {
    opacity: 1;
  }

  .ring {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: conic-gradient(
      from var(--orbit),
      rgba(94, 177, 255, 0.16) 0deg,
      rgba(94, 177, 255, 0.16) 300deg,
      rgba(150, 200, 255, 0.55) 345deg,
      rgba(94, 177, 255, 0.16) 360deg
    );
    padding: 2px;
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    mask-composite: exclude;
    animation: orbit 2.4s linear infinite;
  }

  @keyframes orbit {
    to {
      --orbit: 360deg;
    }
  }

  .head,
  .dust {
    display: none;
  }

  @supports (offset-path: border-box) {
    .head {
      display: block;
      position: absolute;
      width: 30px;
      height: 5px;
      border-radius: 3px;
      background: linear-gradient(
        to left,
        #ffffff,
        rgba(140, 195, 255, 0.9) 40%,
        transparent
      );
      box-shadow: 0 0 12px 3px rgba(120, 180, 255, 0.85);
      offset-path: border-box;
      offset-rotate: auto;
      animation: travel linear infinite;
    }

    .dust {
      display: block;
      position: absolute;
      border-radius: 50%;
      background: #fff;
      box-shadow:
        0 0 6px 1px rgba(94, 177, 255, 0.9),
        0 0 12px 4px rgba(94, 177, 255, 0.35);
      offset-path: border-box;
      offset-rotate: auto;
      animation:
        travel linear infinite,
        puff ease-out infinite;
    }
  }

  @keyframes travel {
    from {
      offset-distance: 0%;
    }
    to {
      offset-distance: 100%;
    }
  }

  /* translateY in the path-rotated frame pushes perpendicular to the
     border, so the dust drifts away from the edge as it fades */
  @keyframes puff {
    0% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(var(--out)) scale(0.15);
      opacity: 0;
    }
  }
</style>
