<script lang="ts">
  // A new scene every visit: random palette, random drifting glow orbs.
  const baseHue = Math.floor(Math.random() * 360)
  const palette = [
    baseHue,
    (baseHue + 35 + Math.random() * 50) % 360,
    (baseHue + 165 + Math.random() * 50) % 360,
  ]
  const pick = () =>
    palette[Math.floor(Math.random() * palette.length)] +
    (Math.random() * 24 - 12)

  const bgTop = `hsl(${baseHue} 45% 5%)`
  const bgBottom = `hsl(${(baseHue + 40) % 360} 40% 9%)`

  const orbs = Array.from({ length: 9 + Math.floor(Math.random() * 5) }, () => ({
    hue: pick(),
    size: 140 + Math.random() * 320,
    x: Math.random() * 100,
    y: Math.random() * 100,
    dx: -14 + Math.random() * 28,
    dy: -12 + Math.random() * 24,
    dur: 24 + Math.random() * 36,
    delay: -Math.random() * 50,
    opacity: 0.3 + Math.random() * 0.25,
  }))

  const stars = Array.from({ length: 35 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    r: 1 + Math.random() * 2,
    dur: 4 + Math.random() * 5,
    delay: -Math.random() * 9,
  }))
</script>

<div class="scene" style="background: linear-gradient(to bottom, {bgTop}, {bgBottom})">
  {#each orbs as o, i (i)}
    <span
      class="orb"
      style="left:{o.x}%; top:{o.y}%; width:{o.size}px; height:{o.size}px;
             background: radial-gradient(circle, hsl({o.hue} 65% 55% / {o.opacity}), transparent 65%);
             --dx:{o.dx}vw; --dy:{o.dy}vh;
             animation-duration:{o.dur}s; animation-delay:{o.delay}s"
    ></span>
  {/each}
  {#each stars as s, i (i)}
    <span
      class="star"
      style="left:{s.x}%; top:{s.y}%; width:{s.r}px; height:{s.r}px;
             animation-duration:{s.dur}s; animation-delay:{s.delay}s"
    ></span>
  {/each}
</div>

<style>
  .scene {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
  }

  .orb {
    position: absolute;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    will-change: transform;
    animation: float ease-in-out infinite alternate;
  }

  @keyframes float {
    to {
      transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy)))
        scale(1.2);
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
      opacity: 0.1;
    }
    to {
      opacity: 0.7;
    }
  }
</style>
