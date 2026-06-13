<script lang="ts">
  import { i18n } from '../i18n.svelte'
  import { APP_VERSION, PROJECT_URL } from '../meta'
  import Dialog from './Dialog.svelte'

  let { open = $bindable() }: { open: boolean } = $props()

  // re-read resolution each time the dialog opens
  const resolution = $derived(
    open ? `${window.innerWidth} × ${window.innerHeight}` : '',
  )
</script>

<Dialog bind:open>
  <h2>{i18n.t('info.title')}</h2>
  <dl>
    <dt>{i18n.t('info.resolution')}</dt>
    <dd>{resolution}</dd>
    <dt>{i18n.t('info.userAgent')}</dt>
    <dd class="ua">{navigator.userAgent}</dd>
    <dt>{i18n.t('info.version')}</dt>
    <dd>{APP_VERSION}</dd>
    <dt>{i18n.t('info.project')}</dt>
    <dd><a href={PROJECT_URL}>{PROJECT_URL.replace('https://', '')}</a></dd>
  </dl>
  <button class="close" onclick={() => (open = false)}>{i18n.t('close')}</button>
</Dialog>

<style>
  h2 {
    margin: 0 0 22px;
    font-size: 25px;
    font-weight: 600;
  }

  dl {
    margin: 0 0 26px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 12px 28px;
    font-size: 19px;
  }

  dt {
    color: var(--muted);
    white-space: nowrap;
  }

  dd {
    margin: 0;
    word-break: break-word;
  }

  .ua {
    font-size: 16px;
    color: var(--muted);
  }

  .close {
    padding: 13px 32px;
    font-size: 20px;
    background: rgba(21, 27, 41, 0.55);
    backdrop-filter: blur(12px);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    color: var(--text);
    transition: border-color 0.15s ease, background 0.15s ease;
  }

  .close:hover {
    border-color: var(--accent);
    background: rgba(59, 130, 246, 0.18);
  }
</style>
