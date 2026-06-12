<script lang="ts">
  import { scrollY } from 'svelte/reactivity/window'

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

  // two depth groups for parallax: far (small, slow) and near (big, faster)
  // far orbs are small and slow, near orbs big and fast: the speed
  // difference is what sells the depth
  const makeOrbs = (count: number, scale: number, durMin: number, durMax: number) =>
    Array.from({ length: count }, () => ({
      hue: pick(),
      size: (110 + Math.random() * 300) * scale,
      x: Math.random() * 100,
      y: Math.random() * 140,
      dx: (-20 + Math.random() * 40) * scale,
      dy: (-16 + Math.random() * 32) * scale,
      dur: durMin + Math.random() * (durMax - durMin),
      delay: -Math.random() * 23,
      opacity: 0.3 + Math.random() * 0.25,
    }))

  const farOrbs = makeOrbs(6, 0.7, 26, 48)
  const nearOrbs = makeOrbs(7, 1.15, 8, 16)

  const stars = Array.from({ length: 35 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 140,
    r: 1 + Math.random() * 2,
    dur: 4 + Math.random() * 5,
    delay: -Math.random() * 9,
  }))

  const y = $derived(scrollY.current ?? 0)
</script>

{#snippet orbGroup(orbs: ReturnType<typeof makeOrbs>)}
  {#each orbs as o, i (i)}
    <span
      class="orb"
      style="left:{o.x}%; top:{o.y}vh; width:{o.size}px; height:{o.size}px;
             background: radial-gradient(circle, hsl({o.hue} 65% 55% / {o.opacity}), transparent 65%);
             --dx:{o.dx}vw; --dy:{o.dy}vh;
             animation-duration:{o.dur}s; animation-delay:{o.delay}s"
    ></span>
  {/each}
{/snippet}

<div class="scene" style="background: linear-gradient(to bottom, {bgTop}, {bgBottom})">
  <div class="layer" style="transform: translate3d(0, {-y * 0.04}px, 0)">
    {#each stars as s, i (i)}
      <span
        class="star"
        style="left:{s.x}%; top:{s.y}vh; width:{s.r}px; height:{s.r}px;
               animation-duration:{s.dur}s; animation-delay:{s.delay}s"
      ></span>
    {/each}
  </div>
  <div class="layer" style="transform: translate3d(0, {-y * 0.09}px, 0)">
    {@render orbGroup(farOrbs)}
  </div>
  <div class="layer" style="transform: translate3d(0, {-y * 0.2}px, 0)">
    {@render orbGroup(nearOrbs)}
  </div>
</div>

<style>
  .scene {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
  }

  .layer {
    position: absolute;
    inset: 0;
    height: 150vh;
    will-change: transform;
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
        scale(1.25);
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
