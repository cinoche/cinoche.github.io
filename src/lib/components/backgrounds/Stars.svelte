<script lang="ts">
  const stars = Array.from({ length: 60 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 68,
    r: 1 + Math.random() * 2.6,
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
  <span class="shooting"></span>
  <svg class="mountains" viewBox="0 0 1920 440" preserveAspectRatio="xMidYMax slice">
    <path
      d="M0 160 L260 0 L480 120 L720 -40 L960 110 L1200 -10 L1460 130 L1700 20 L1920 100 L1920 440 L0 440 Z"
      fill="#101a30"
    />
    <path
      d="M0 260 L320 120 L600 230 L880 100 L1180 240 L1480 130 L1920 240 L1920 440 L0 440 Z"
      fill="#070b14"
    />
  </svg>
</div>

<style>
  .scene {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    background: linear-gradient(to bottom, #070b18 0%, #0b1226 70%, #0d1322 100%);
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
    top: 8%;
    left: 78%;
    width: 130px;
    height: 2px;
    border-radius: 2px;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.9), transparent);
    transform: rotate(-200deg);
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
    bottom: 0;
    width: 100%;
    height: 40%;
  }
</style>
