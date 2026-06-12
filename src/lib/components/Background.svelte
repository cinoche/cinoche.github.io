<script lang="ts">
  import { settings } from '../settings.svelte'
  import Aurora from './backgrounds/Aurora.svelte'
  import Grid from './backgrounds/Grid.svelte'
  import Random from './backgrounds/Random.svelte'
  import Road from './backgrounds/Road.svelte'
  import Stars from './backgrounds/Stars.svelte'
</script>

{#if settings.background === 'stars'}
  <Stars />
{:else if settings.background === 'road'}
  <Road />
{:else if settings.background === 'aurora'}
  <Aurora />
{:else if settings.background === 'grid'}
  <Grid />
{:else if settings.background === 'random'}
  <Random />
{/if}
