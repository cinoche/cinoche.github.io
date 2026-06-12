<script lang="ts">
  import { i18n } from '../i18n.svelte'
  import { navigateTo } from '../tesla'
  import Dialog from './Dialog.svelte'

  let {
    open = $bindable(),
    initialUrl = '',
  }: {
    open: boolean
    initialUrl?: string
  } = $props()

  // initialUrl comes from the ?url= query param, fixed for the page's lifetime
  // svelte-ignore state_referenced_locally
  let value = $state(initialUrl || 'https://')
  let input: HTMLInputElement | undefined = $state()

  $effect(() => {
    if (open) input?.select()
  })
</script>

<Dialog bind:open>
  <h2>{i18n.t('url.title')}</h2>
  <form
    onsubmit={(e) => {
      e.preventDefault()
      navigateTo(value)
    }}
  >
    <input
      bind:this={input}
      bind:value
      type="text"
      placeholder={i18n.t('url.placeholder')}
      autocomplete="off"
      autocapitalize="off"
      spellcheck="false"
    />
    <button type="submit">{i18n.t('url.go')}</button>
  </form>
</Dialog>

<style>
  h2 {
    margin: 0 0 18px;
    font-size: 20px;
    font-weight: 600;
  }

  form {
    display: flex;
    gap: 12px;
    width: min(560px, 80vw);
  }

  input {
    flex: 1;
    padding: 14px 20px;
    font-size: 17px;
    color: var(--text);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    outline: none;
  }

  input:focus {
    border-color: var(--accent);
  }

  button {
    padding: 14px 28px;
    font-size: 17px;
    font-weight: 600;
    color: #fff;
    background: var(--accent);
    border-radius: 12px;
    transition: filter 0.15s ease;
  }

  button:hover {
    filter: brightness(1.15);
  }
</style>
