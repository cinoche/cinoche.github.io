export type Locale = 'fr' | 'en'

const STORAGE_KEY = 'cinoche-locale'

const dict = {
  fr: {
    search: 'Rechercher…',
    'cat.all': 'Tout',
    'cat.streaming': 'Streaming',
    'cat.tv': 'Télé',
    'cat.sports': 'Sports',
    'cat.music': 'Musique',
    'cat.games': 'Jeux',
    'cat.tools': 'Outils',
    'tile.customUrl': 'Adresse web',
    'hero.featured': 'En vedette',
    'hero.open': 'Ouvrir',
    noResults: 'Aucun résultat',
    'url.title': 'Ouvrir une adresse web',
    'url.placeholder': 'https://…',
    'url.go': 'Aller',
    'info.title': 'À propos',
    'info.resolution': 'Résolution de la fenêtre',
    'info.userAgent': 'Agent utilisateur',
    'info.version': 'Version de Cinoche',
    'info.project': 'Projet',
    'fs.notFullscreen': "Cinoche n'est pas en plein écran.",
    'fs.question': 'Pour une meilleure expérience, voulez-vous passer en plein écran?',
    'fs.yes': 'Oui',
    'fs.no': 'Non',
    fullscreen: 'Plein écran',
    'bg.title': 'Arrière-plan',
    'bg.gradient': 'Dégradé',
    'bg.stars': 'Étoiles',
    'bg.road': 'Route',
    'bg.aurora': 'Aurore',
    'bg.grid': 'Grille',
    'bg.random': 'Aléatoire',
    close: 'Fermer',
  },
  en: {
    search: 'Search…',
    'cat.all': 'All',
    'cat.streaming': 'Streaming',
    'cat.tv': 'TV',
    'cat.sports': 'Sports',
    'cat.music': 'Music',
    'cat.games': 'Games',
    'cat.tools': 'Tools',
    'tile.customUrl': 'Web address',
    'hero.featured': 'Featured',
    'hero.open': 'Open',
    noResults: 'No results',
    'url.title': 'Open a web address',
    'url.placeholder': 'https://…',
    'url.go': 'Go',
    'info.title': 'About',
    'info.resolution': 'Window resolution',
    'info.userAgent': 'User agent',
    'info.version': 'Cinoche version',
    'info.project': 'Project',
    'fs.notFullscreen': 'Cinoche is not in fullscreen.',
    'fs.question': 'For a better experience, would you like to switch to fullscreen?',
    'fs.yes': 'Yes',
    'fs.no': 'No',
    fullscreen: 'Fullscreen',
    'bg.title': 'Background',
    'bg.gradient': 'Gradient',
    'bg.stars': 'Stars',
    'bg.road': 'Road',
    'bg.aurora': 'Aurora',
    'bg.grid': 'Grid',
    'bg.random': 'Random',
    close: 'Close',
  },
} as const

export type MessageKey = keyof (typeof dict)['fr']

function initialLocale(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'fr' || saved === 'en') return saved
  return navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

class I18n {
  locale = $state<Locale>(initialLocale())

  t = (key: MessageKey): string => dict[this.locale][key]

  toggle = () => {
    this.locale = this.locale === 'fr' ? 'en' : 'fr'
    localStorage.setItem(STORAGE_KEY, this.locale)
    document.documentElement.lang = this.locale
  }
}

export const i18n = new I18n()
