<script lang="ts">
  import { scrollY } from 'svelte/reactivity/window'

  const stars = Array.from({ length: 30 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 48,
    r: 1 + Math.random() * 2,
    dur: 4 + Math.random() * 5,
    delay: -Math.random() * 9,
  }))

  const y = $derived(scrollY.current ?? 0)
</script>

<div class="scene">
  <div class="layer" style="transform: translate3d(0, {-y * 0.04}px, 0)">
    {#each stars as s, i (i)}
      <span
        class="star"
        style="left:{s.x}%; top:{s.y}%; width:{s.r}px; height:{s.r}px;
               animation-duration:{s.dur}s; animation-delay:{s.delay}s"
      ></span>
    {/each}
  </div>

  <div class="layer" style="transform: translate3d(0, {-y * 0.1}px, 0)">
    <div class="sun"></div>
    <div class="floor">
      <div class="plane">
        <div class="vlines"></div>
        <div class="hlines"></div>
      </div>
      <div class="haze"></div>
    </div>
  </div>
</div>

<style>
  .scene {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    background: linear-gradient(to bottom, #06080f 0%, #0a1124 55%, #070a14 100%);
  }

  .layer {
    position: absolute;
    inset: 0;
    height: 150vh;
    will-change: transform;
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
    }
    to {
      opacity: 0.8;
    }
  }

  .sun {
    position: absolute;
    left: 0;
    right: 0;
    top: 36vh;
    height: 34vh;
    background: radial-gradient(
      40% 100% at 50% 50%,
      rgba(59, 130, 246, 0.22),
      transparent 70%
    );
    animation: pulse 8s ease-in-out infinite alternate;
  }

  @keyframes pulse {
    from {
      opacity: 0.65;
    }
    to {
      opacity: 1;
    }
  }

  .floor {
    position: absolute;
    left: 0;
    right: 0;
    top: 52vh;
    height: 98vh;
    perspective: 260px;
    perspective-origin: 50% 0%;
    overflow: hidden;
  }

  .plane {
    position: absolute;
    left: -100%;
    width: 300%;
    top: 0;
    height: 2600px;
    transform-origin: 50% 0%;
    transform: rotateX(78deg);
    overflow: hidden;
  }

  .vlines {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      90deg,
      rgba(46, 58, 85, 0.85) 0 2px,
      transparent 2px 160px
    );
  }

  /* scroll is a composited transform, not background-position,
     to avoid per-frame repaints of the large 3D plane */
  .hlines {
    position: absolute;
    top: -120px;
    left: 0;
    right: 0;
    height: calc(100% + 120px);
    background: repeating-linear-gradient(
      to bottom,
      rgba(46, 58, 85, 0.85) 0 2px,
      transparent 2px 120px
    );
    will-change: transform;
    animation: scroll 2.2s linear infinite;
  }

  @keyframes scroll {
    to {
      transform: translateY(120px);
    }
  }

  .haze {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 26vh;
    background: linear-gradient(to bottom, #0a1124, transparent);
  }
</style>
