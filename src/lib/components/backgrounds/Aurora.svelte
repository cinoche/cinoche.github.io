<script lang="ts">
  import { scrollY } from 'svelte/reactivity/window'

  const stars = Array.from({ length: 40 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 130,
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
        style="left:{s.x}%; top:{s.y}vh; width:{s.r}px; height:{s.r}px;
               animation-duration:{s.dur}s; animation-delay:{s.delay}s"
      ></span>
    {/each}
  </div>

  <!-- softness comes from gradient falloff, not blur filters: cheap to composite -->
  <div class="layer" style="transform: translate3d(0, {-y * 0.14}px, 0)">
    <div class="ribbon r1"></div>
    <div class="ribbon r2"></div>
    <div class="ribbon r3"></div>
    <div class="ribbon r4"></div>
  </div>
</div>

<style>
  .scene {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    background: linear-gradient(to bottom, #050810 0%, #0a0d1a 100%);
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
      opacity: 0.1;
    }
    to {
      opacity: 0.8;
    }
  }

  .ribbon {
    position: absolute;
    left: -15%;
    width: 130%;
    height: 42vh;
    will-change: transform;
  }

  .r1 {
    top: 2vh;
    background: radial-gradient(
      55% 45% at 45% 50%,
      rgba(24, 104, 94, 0.6),
      rgba(14, 59, 52, 0.26) 55%,
      transparent 75%
    );
    animation: drift1 13s ease-in-out infinite alternate;
  }

  .r2 {
    top: 16vh;
    background: radial-gradient(
      60% 42% at 60% 50%,
      rgba(54, 58, 134, 0.5),
      rgba(28, 95, 99, 0.18) 55%,
      transparent 75%
    );
    animation: drift2 17s ease-in-out infinite alternate;
  }

  .r3 {
    top: -8vh;
    background: radial-gradient(
      65% 40% at 50% 55%,
      rgba(32, 110, 114, 0.4),
      rgba(43, 46, 107, 0.14) 55%,
      transparent 75%
    );
    animation: drift3 22s ease-in-out infinite alternate;
  }

  .r4 {
    top: 58vh;
    background: radial-gradient(
      55% 42% at 40% 50%,
      rgba(43, 46, 107, 0.45),
      rgba(20, 81, 74, 0.16) 55%,
      transparent 75%
    );
    animation: drift2 19s ease-in-out infinite alternate-reverse;
  }

  @keyframes drift1 {
    to {
      transform: translateX(-12%) skewY(-4deg) scaleY(1.45);
    }
  }

  @keyframes drift2 {
    to {
      transform: translateX(13%) skewY(3.5deg) scaleY(0.7);
    }
  }

  @keyframes drift3 {
    to {
      transform: translateX(-9%) skewY(3deg) scaleY(1.5);
    }
  }
</style>
