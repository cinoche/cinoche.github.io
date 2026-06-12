<script lang="ts">
  const stars = Array.from({ length: 40 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 90,
    r: 1 + Math.random() * 2,
    dur: 4 + Math.random() * 5,
    delay: -Math.random() * 9,
  }))
</script>

<div class="scene">
  {#each stars as s, i (i)}
    <span
      class="star"
      style="left:{s.x}%; top:{s.y}%; width:{s.r}px; height:{s.r}px;
             animation-duration:{s.dur}s; animation-delay:{s.delay}s"
    ></span>
  {/each}
  <!-- softness comes from gradient falloff, not blur filters: cheap to composite -->
  <div class="ribbon r1"></div>
  <div class="ribbon r2"></div>
  <div class="ribbon r3"></div>
</div>

<style>
  .scene {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    background: linear-gradient(to bottom, #050810 0%, #0a0d1a 100%);
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
    height: 42%;
    will-change: transform;
  }

  .r1 {
    top: 4%;
    background: radial-gradient(
      55% 45% at 45% 50%,
      rgba(20, 81, 74, 0.5),
      rgba(14, 59, 52, 0.22) 55%,
      transparent 75%
    );
    animation: drift1 36s ease-in-out infinite alternate;
  }

  .r2 {
    top: 18%;
    background: radial-gradient(
      60% 42% at 60% 50%,
      rgba(43, 46, 107, 0.42),
      rgba(28, 95, 99, 0.16) 55%,
      transparent 75%
    );
    animation: drift2 46s ease-in-out infinite alternate;
  }

  .r3 {
    top: -6%;
    background: radial-gradient(
      65% 40% at 50% 55%,
      rgba(28, 95, 99, 0.32),
      rgba(43, 46, 107, 0.12) 55%,
      transparent 75%
    );
    animation: drift3 56s ease-in-out infinite alternate;
  }

  @keyframes drift1 {
    to {
      transform: translateX(-6%) skewY(-2.5deg) scaleY(1.25);
    }
  }

  @keyframes drift2 {
    to {
      transform: translateX(7%) skewY(2deg) scaleY(0.82);
    }
  }

  @keyframes drift3 {
    to {
      transform: translateX(-4%) skewY(1.5deg) scaleY(1.3);
    }
  }
</style>
