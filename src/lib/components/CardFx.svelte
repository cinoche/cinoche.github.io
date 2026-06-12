<!-- Hover effect: a comet head travelling around the card border via
     CSS Motion Path, trailing pixie dust around the full perimeter.
     Particles are phased along the whole loop with negative delays
     (so none stack at the path origin) and fade/shrink/scatter the
     further they are behind the head. Shown via .card:hover in the
     parent. Browsers without offset-path support just get the ring. -->
<script lang="ts">
  const PERIOD = 4.8
  const N = 24
  const dust = Array.from({ length: N }, (_, i) => {
    const f = i / (N - 1) // 0 = right behind the head, 1 = full loop behind
    return {
      delay: -(PERIOD - (0.08 + f * PERIOD * 0.88)),
      size: 5 - f * 3.4,
      o: 0.85 * Math.pow(1 - f, 1.4) + 0.06,
      out: (i % 2 ? 1 : -1) * (3 + f * 13),
      scatterDur: 1.4 + ((i * 7) % 10) * 0.16,
    }
  })
</script>

<div class="fx" aria-hidden="true">
  <div class="ring"></div>
  <span class="head" style="animation-duration: {PERIOD}s"></span>
  {#each dust as d, i (i)}
    <span
      class="dust"
      style="width:{d.size}px; height:{d.size}px; --o:{d.o}; --out:{d.out}px;
             animation-duration: {PERIOD}s, {d.scatterDur}s;
             animation-delay: {d.delay}s, {-(i * 0.37) % 2}s"
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
    transition: opacity 0.25s ease;
  }

  :global(.card:hover) > .fx,
  :global(.card:focus-visible) > .fx {
    opacity: 1;
  }

  .ring {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    border: 1px solid rgba(94, 177, 255, 0.22);
    box-shadow: 0 0 14px rgba(94, 177, 255, 0.12) inset;
  }

  .head,
  .dust {
    display: none;
  }

  @supports (offset-path: border-box) {
    .head {
      display: block;
      position: absolute;
      width: 24px;
      height: 4px;
      border-radius: 3px;
      background: linear-gradient(
        to left,
        #ffffff,
        rgba(140, 195, 255, 0.9) 45%,
        transparent
      );
      box-shadow: 0 0 12px 3px rgba(140, 195, 255, 0.85);
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
        0 0 5px 1px rgba(140, 195, 255, 0.8),
        0 0 11px 3px rgba(94, 177, 255, 0.3);
      offset-path: border-box;
      offset-rotate: auto;
      animation:
        travel linear infinite,
        scatter ease-in-out infinite alternate;
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
     border: the dust shimmers while slowly straying from the edge */
  @keyframes scatter {
    from {
      transform: translateY(0) scale(1);
      opacity: var(--o);
    }
    to {
      transform: translateY(var(--out)) scale(0.5);
      opacity: calc(var(--o) * 0.3);
    }
  }
</style>
