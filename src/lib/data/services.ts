export type Category = 'streaming' | 'tv' | 'sports' | 'tools'

export interface Service {
  id: string
  name: string
  url: string
  logo: string
  category: Category
}

export const categories: Category[] = ['streaming', 'tv', 'sports', 'tools']

export const services: Service[] = [
  // Streaming
  { id: 'crave', name: 'Crave', url: 'https://www.crave.ca/en', logo: 'logos/crave.png', category: 'streaming' },
  { id: 'disneyplus', name: 'Disney+', url: 'https://www.disneyplus.com/fr-ca/login', logo: 'logos/disneyplus.png', category: 'streaming' },
  { id: 'hbo', name: 'HBO', url: 'https://www.crave.ca/en/hbo', logo: 'logos/hbogo.png', category: 'streaming' },
  { id: 'netflix', name: 'Netflix', url: 'https://netflix.com/', logo: 'logos/netflix.png', category: 'streaming' },
  { id: 'paramountplus', name: 'Paramount+', url: 'https://www.paramountplus.com/ca/', logo: 'logos/paramountplus.png', category: 'streaming' },
  { id: 'plex', name: 'Plex', url: 'https://app.plex.tv/desktop/#!/', logo: 'logos/plex.png', category: 'streaming' },
  { id: 'prime', name: 'Prime Video', url: 'https://www.primevideo.com', logo: 'logos/prime.png', category: 'streaming' },
  { id: 'toutv', name: 'Tou.TV', url: 'https://ici.tou.tv/', logo: 'logos/toutv.png', category: 'streaming' },
  { id: 'tubi', name: 'Tubi', url: 'https://tubitv.com/', logo: 'logos/tubitv.png', category: 'streaming' },
  { id: 'youtube', name: 'YouTube', url: 'https://www.youtube.com', logo: 'logos/youtube.png', category: 'streaming' },
  // Télé / TV
  { id: 'bell', name: 'Bell Fibe TV', url: 'https://tv.bell.ca/', logo: 'logos/bell.png', category: 'tv' },
  { id: 'citytv', name: 'CityTV', url: 'https://www.citytv.com/', logo: 'logos/citytv.png', category: 'tv' },
  { id: 'illico', name: 'Illico Web', url: 'https://illicoweb.videotron.com/', logo: 'logos/illico.png', category: 'tv' },
  { id: 'noovo', name: 'Noovo', url: 'https://noovo.ca/', logo: 'logos/noovo.png', category: 'tv' },
  { id: 'tvaplus', name: 'TVA+', url: 'https://www.qub.ca/tvaplus', logo: 'logos/tvaplus.png', category: 'tv' },
  { id: 'virgintv', name: 'Virgin TV', url: 'https://tv.virginmobile.ca/', logo: 'logos/virgintv.png', category: 'tv' },
  // Sports
  { id: 'dazn', name: 'DAZN', url: 'https://www.dazn.com/', logo: 'logos/dazn.png', category: 'sports' },
  { id: 'rds', name: 'RDS', url: 'https://www.rds.ca/emissions/en-direct', logo: 'logos/rds.png', category: 'sports' },
  { id: 'twitch', name: 'Twitch', url: 'https://www.twitch.com', logo: 'logos/twitch.png', category: 'sports' },
  // Outils / Tools
  { id: 'waze', name: 'TeslaWaze', url: 'https://teslawaze.azurewebsites.net', logo: 'logos/waze.png', category: 'tools' },
]

const stripAccents = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export function matchesQuery(service: Service, query: string): boolean {
  const q = stripAccents(query.trim())
  if (!q) return true
  return stripAccents(service.name).includes(q) || service.id.includes(q)
}
