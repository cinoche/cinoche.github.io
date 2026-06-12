<!-- Hover effect: a comet orbiting the card border with a glowing halo
     and dust sparkles that flash as it passes. Shown via .card:hover in
     the parent. The orbit angle animates the global @property --orbit. -->
<script lang="ts">
  // perimeter anchor points (top-centre = 0deg, clockwise) for the dust;
  // each sparkle's delay lines up with the comet reaching its corner
  const sparks = [
    { x: 50, y: 0, t: 0 },
    { x: 96, y: 4, t: 0.125 },
    { x: 100, y: 50, t: 0.25 },
    { x: 96, y: 96, t: 0.375 },
    { x: 50, y: 100, t: 0.5 },
    { x: 4, y: 96, t: 0.625 },
    { x: 0, y: 50, t: 0.75 },
    { x: 4, y: 4, t: 0.875 },
  ]
  const PERIOD = 2.4
</script>

<div class="fx" aria-hidden="true">
  <div class="halo"></div>
  <div class="ring"></div>
  {#each sparks as s, i (i)}
    <span
      class="spark"
      style="left:{s.x}%; top:{s.y}%; animation-delay:{s.t * PERIOD}s; animation-duration:{PERIOD}s"
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

  .ring,
  .halo {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: conic-gradient(
      from var(--orbit),
      transparent 0deg,
      transparent 285deg,
      rgba(94, 177, 255, 0.55) 330deg,
      #dceaff 357deg,
      #ffffff 360deg
    );
    padding: 3px;
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

  .halo {
    inset: -3px;
    padding: 9px;
    filter: blur(5px);
    opacity: 0.8;
  }

  @keyframes orbit {
    to {
      --orbit: 360deg;
    }
  }

  .spark {
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #fff;
    transform: translate(-50%, -50%) scale(0);
    box-shadow:
      0 0 8px 2px rgba(94, 177, 255, 0.9),
      0 0 16px 5px rgba(94, 177, 255, 0.4);
    animation: sparkle linear infinite;
  }

  @keyframes sparkle {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0;
    }
    4% {
      transform: translate(-50%, -50%) scale(1.4);
      opacity: 1;
    }
    18% {
      transform: translate(-50%, -50%) scale(0.4) translateY(-7px);
      opacity: 0.5;
    }
    30%,
    100% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0;
    }
  }
</style>
