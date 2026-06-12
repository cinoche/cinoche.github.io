<script lang="ts">
  import { scrollY } from 'svelte/reactivity/window'

  const stars = Array.from({ length: 30 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 50,
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
    <div class="glow"></div>
    <div class="ground">
      <div class="plane">
        <div class="edge left"></div>
        <div class="dashes"><div class="strip"></div></div>
        <div class="edge right"></div>
      </div>
    </div>
  </div>
</div>

<style>
  .scene {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    background: linear-gradient(to bottom, #05070f 0%, #0a1020 58%, #06080f 100%);
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
      opacity: 0.85;
    }
  }

  .glow {
    position: absolute;
    left: 0;
    right: 0;
    top: 48vh;
    height: 26vh;
    background: radial-gradient(
      55% 100% at 50% 30%,
      rgba(94, 177, 255, 0.18),
      transparent 70%
    );
    animation: pulse 7s ease-in-out infinite alternate;
  }

  @keyframes pulse {
    from {
      opacity: 0.7;
    }
    to {
      opacity: 1;
    }
  }

  .ground {
    position: absolute;
    left: 0;
    right: 0;
    top: 56vh;
    height: 94vh;
    perspective: 240px;
    perspective-origin: 50% 0%;
    overflow: hidden;
  }

  .plane {
    position: absolute;
    left: -50%;
    width: 200%;
    top: 0;
    height: 2400px;
    transform-origin: 50% 0%;
    transform: rotateX(76deg);
    background: linear-gradient(
      90deg,
      transparent 0 41%,
      #0c111e 41% 59%,
      transparent 59% 100%
    );
  }

  /* dash motion is a composited transform, not background-position,
     to avoid per-frame repaints of the large 3D plane */
  .dashes {
    position: absolute;
    left: 49.75%;
    width: 0.5%;
    height: 100%;
    overflow: hidden;
  }

  .strip {
    position: absolute;
    top: -210px;
    width: 100%;
    height: calc(100% + 210px);
    background: repeating-linear-gradient(
      to bottom,
      rgba(110, 125, 160, 0.5) 0 70px,
      transparent 70px 210px
    );
    will-change: transform;
    animation: roll 1.6s linear infinite;
  }

  .edge {
    position: absolute;
    width: 0.5%;
    height: 100%;
    background: #22304f;
  }

  .edge.left {
    left: 41.5%;
  }

  .edge.right {
    right: 41.5%;
  }

  @keyframes roll {
    to {
      transform: translateY(210px);
    }
  }
</style>
