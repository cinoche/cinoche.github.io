<script lang="ts">
  import { i18n } from '../i18n.svelte'
  import { goFullscreen } from '../tesla'
  import Dialog from './Dialog.svelte'

  let { open = $bindable() }: { open: boolean } = $props()
</script>

<Dialog bind:open>
  <div class="icon">⛶</div>
  <p class="lead">{i18n.t('fs.notFullscreen')}</p>
  <p>{i18n.t('fs.question')}</p>
  <div class="buttons">
    <button class="primary" onclick={goFullscreen}>{i18n.t('fs.yes')}</button>
    <button onclick={() => (open = false)}>{i18n.t('fs.no')}</button>
  </div>
</Dialog>

<style>
  .icon {
    font-size: 56px;
    text-align: center;
    line-height: 1;
    margin-bottom: 14px;
    color: var(--accent);
  }

  p {
    margin: 0 0 10px;
    text-align: center;
    font-size: 17px;
  }

  .lead {
    font-weight: 600;
    font-size: 19px;
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 24px;
  }

  button {
    min-width: 120px;
    padding: 14px 28px;
    font-size: 17px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 999px;
    transition: border-color 0.15s ease, filter 0.15s ease;
  }

  button:hover {
    border-color: var(--accent);
  }

  .primary {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
    font-weight: 600;
  }

  .primary:hover {
    filter: brightness(1.15);
  }
</style>
