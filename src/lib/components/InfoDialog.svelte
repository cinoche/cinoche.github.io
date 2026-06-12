<script lang="ts">
  import { i18n } from '../i18n.svelte'
  import { APP_VERSION, PROJECT_URL } from '../meta'
  import { backgrounds, settings } from '../settings.svelte'
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
  <h3>{i18n.t('bg.title')}</h3>
  <div class="swatches">
    {#each backgrounds as bg (bg)}
      <button
        class="swatch"
        class:active={settings.background === bg}
        onclick={() => settings.setBackground(bg)}
      >
        <span
          class="preview"
          class:gradient={bg === 'gradient'}
          class:random={bg === 'random'}
          style={bg === 'gradient' || bg === 'random'
            ? ''
            : `background-image: url('backgrounds/${bg}.svg')`}
        ></span>
        {i18n.t(`bg.${bg}`)}
      </button>
    {/each}
  </div>

  <button class="close" onclick={() => (open = false)}>{i18n.t('close')}</button>
</Dialog>

<style>
  h2 {
    margin: 0 0 18px;
    font-size: 20px;
    font-weight: 600;
  }

  dl {
    margin: 0 0 22px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px 24px;
    font-size: 15px;
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
    font-size: 13px;
    color: var(--muted);
  }

  h3 {
    margin: 0 0 12px;
    font-size: 15px;
    font-weight: 600;
    color: var(--muted);
  }

  .swatches {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 22px;
  }

  .swatch {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: var(--muted);
    padding: 6px;
    border: 1px solid transparent;
    border-radius: 12px;
    transition: color 0.15s ease, border-color 0.15s ease;
  }

  .swatch:hover {
    color: var(--text);
  }

  .swatch.active {
    color: var(--text);
    border-color: var(--accent);
  }

  .preview {
    width: 76px;
    height: 44px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background-size: cover;
    background-position: center;
  }

  .preview.gradient {
    background-color: var(--bg);
    background-image: radial-gradient(
      60px 30px at 50% -10px,
      rgba(59, 130, 246, 0.5),
      transparent
    );
  }

  .preview.random {
    background-color: #0a0d18;
    background-image:
      radial-gradient(22px 22px at 25% 35%, rgba(168, 85, 247, 0.55), transparent),
      radial-gradient(26px 26px at 70% 60%, rgba(34, 197, 94, 0.45), transparent),
      radial-gradient(20px 20px at 55% 25%, rgba(249, 115, 22, 0.45), transparent);
  }

  .close {
    padding: 12px 28px;
    font-size: 16px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 999px;
    transition: border-color 0.15s ease;
  }

  .close:hover {
    border-color: var(--accent);
  }
</style>
