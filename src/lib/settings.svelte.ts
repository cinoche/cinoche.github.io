export type Background = 'gradient' | 'stars' | 'road' | 'aurora' | 'grid'

export const backgrounds: Background[] = ['gradient', 'stars', 'road', 'aurora', 'grid']

const STORAGE_KEY = 'cinoche-bg'

function initialBackground(): Background {
  const saved = localStorage.getItem(STORAGE_KEY)
  return backgrounds.includes(saved as Background) ? (saved as Background) : 'gradient'
}

class Settings {
  background = $state<Background>(initialBackground())

  setBackground = (bg: Background) => {
    this.background = bg
    localStorage.setItem(STORAGE_KEY, bg)
  }
}

export const settings = new Settings()
