// Tesla browser reports >= 1130px inner width when NOT in fullscreen
// (1111px when fullscreen, as of firmware 2021.4.x — unchanged since).
export const FULLSCREEN_MIN_WIDTH = 1130

export function isLikelyNotFullscreen(): boolean {
  return window.innerWidth >= FULLSCREEN_MIN_WIDTH
}

export function isTesla(): boolean {
  return navigator.userAgent.includes('Tesla')
}

// Only nag about fullscreen in an actual Tesla browser that isn't fullscreen;
// desktop/phone visitors never see the prompt.
export function shouldPromptFullscreen(): boolean {
  return isTesla() && isLikelyNotFullscreen()
}

// Navigating to a youtube.com redirect makes the Tesla browser enter
// theater (fullscreen) mode for the target site.
export function goFullscreen(): void {
  window.location.replace(
    'https://www.youtube.com/redirect?q=' + window.location.href + '/',
  )
}

export function getUrlParam(name: string): string | null {
  return new URLSearchParams(window.location.search).get(name)
}

export function navigateTo(raw: string): void {
  let url = raw.trim()
  if (!url) return
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(url)) url = 'https://' + url
  window.location.href = url
}
