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
    border-radius: var(--radius-card);
    background: rgba(21, 27, 41, 0.78);
    backdrop-filter: blur(18px);
    color: var(--text);
    box-shadow: var(--shadow);
    max-width: min(680px, 92vw);
  }

  dialog::backdrop {
    background: rgba(4, 6, 12, 0.6);
    backdrop-filter: blur(4px);
  }

  .content {
    padding: 32px 36px;
  }
</style>
