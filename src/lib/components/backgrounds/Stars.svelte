<script lang="ts">
  import { scrollY } from 'svelte/reactivity/window'

  const makeStars = (count: number, rMin: number, rMax: number) =>
    Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 90,
      r: rMin + Math.random() * (rMax - rMin),
      dur: 4 + Math.random() * 5,
      delay: -Math.random() * 9,
    }))

  // two star depths drifting at different speeds and directions
  const farStars = makeStars(45, 0.8, 2)
  const nearStars = makeStars(25, 2, 3.6)

  const y = $derived(scrollY.current ?? 0)
</script>

<div class="scene">
  <div class="layer" style="transform: translate3d(0, {-y * 0.05}px, 0)">
    <div class="drift slow">
      {#each farStars as s, i (i)}
        <span
          class="star"
          style="left:{s.x}%; top:{s.y}%; width:{s.r}px; height:{s.r}px;
                 animation-duration:{s.dur}s; animation-delay:{s.delay}s"
        ></span>
      {/each}
    </div>
    <div class="drift fast">
      {#each nearStars as s, i (i)}
        <span
          class="star"
          style="left:{s.x}%; top:{s.y}%; width:{s.r}px; height:{s.r}px;
                 animation-duration:{s.dur}s; animation-delay:{s.delay}s"
        ></span>
      {/each}
      <span class="shooting"></span>
    </div>
  </div>

  <div class="layer" style="transform: translate3d(0, {-y * 0.12}px, 0)">
    <svg class="mountains far" viewBox="0 0 1920 700" preserveAspectRatio="xMidYMin slice">
      <path
        d="M0 300 L260 140 L480 260 L720 100 L960 250 L1200 130 L1460 270 L1700 160 L1920 240 L1920 700 L0 700 Z"
        fill="#101a30"
      />
    </svg>
  </div>

  <div class="layer" style="transform: translate3d(0, {-y * 0.22}px, 0)">
    <svg class="mountains near" viewBox="0 0 1920 700" preserveAspectRatio="xMidYMin slice">
      <path
        d="M0 320 L320 180 L600 290 L880 160 L1180 300 L1480 190 L1920 300 L1920 700 L0 700 Z"
        fill="#070b14"
      />
    </svg>
  </div>
</div>

<style>
  .scene {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    background: linear-gradient(to bottom, #070b18 0%, #0b1226 70%, #0d1322 100%);
  }

  .layer {
    position: absolute;
    inset: 0;
    height: 160vh;
    will-change: transform;
  }

  .drift {
    position: absolute;
    inset: 0;
  }

  .drift.slow {
    animation: driftL 70s ease-in-out infinite alternate;
  }

  .drift.fast {
    animation: driftR 38s ease-in-out infinite alternate;
  }

  @keyframes driftL {
    from {
      transform: translateX(-1.5vw);
    }
    to {
      transform: translateX(1.5vw);
    }
  }

  @keyframes driftR {
    from {
      transform: translateX(2.5vw);
    }
    to {
      transform: translateX(-2.5vw);
    }
  }

  .star {
    position: absolute;
    border-radius: 50%;
    background: #fff;
    animation: twinkle ease-in-out infinite alternate;
  }

  @keyframes twinkle {
    from {
      opacity: 0.12;
      transform: scale(0.8);
    }
    to {
      opacity: 0.9;
      transform: scale(1.1);
    }
  }

  .shooting {
    position: absolute;
    top: 6%;
    left: 78%;
    width: 130px;
    height: 2px;
    border-radius: 2px;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.9), transparent);
    opacity: 0;
    animation: shoot 11s linear infinite;
  }

  @keyframes shoot {
    0% {
      transform: translate(0, 0) rotate(-200deg);
      opacity: 0;
    }
    2% {
      opacity: 0.9;
    }
    9% {
      transform: translate(-55vw, 22vh) rotate(-200deg);
      opacity: 0;
    }
    100% {
      transform: translate(-55vw, 22vh) rotate(-200deg);
      opacity: 0;
    }
  }

  .mountains {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
  }

  .mountains.far {
    top: 62vh;
    height: 98vh;
  }

  .mountains.near {
    top: 68vh;
    height: 92vh;
  }
</style>
