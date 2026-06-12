<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    open = $bindable(),
    children,
  }: {
    open: boolean
    children: Snippet
  } = $props()

  let el: HTMLDialogElement

  $effect(() => {
    if (open && !el.open) el.showModal()
    else if (!open && el.open) el.close()
  })
</script>

<dialog
  bind:this={el}
  onclose={() => (open = false)}
  onclick={(e) => {
    if (e.target === el) open = false
  }}
>
  <div class="content">
    {@render children()}
  </div>
</dialog>

<style>
  dialog {
    padding: 0;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--surface-raised);
    color: var(--text);
    box-shadow: var(--shadow);
    max-width: min(680px, 92vw);
  }

  dialog::backdrop {
    background: rgba(4, 6, 12, 0.7);
    backdrop-filter: blur(3px);
  }

  .content {
    padding: 28px 32px;
  }
</style>
