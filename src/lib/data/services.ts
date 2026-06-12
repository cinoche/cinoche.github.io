export type Category = 'streaming' | 'tv' | 'sports' | 'music' | 'games' | 'tools'

export interface Service {
  id: string
  name: string
  url: string
  logo: string
  category: Category
}

export const categories: Category[] = ['streaming', 'tv', 'sports', 'music', 'games', 'tools']

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
  { id: 'gem', name: 'CBC Gem', url: 'https://gem.cbc.ca', logo: 'logos/gem.png', category: 'streaming' },
  { id: 'pluto', name: 'Pluto TV', url: 'https://pluto.tv', logo: 'logos/pluto.png', category: 'streaming' },
  { id: 'appletv', name: 'Apple TV+', url: 'https://tv.apple.com/ca', logo: 'logos/appletv.png', category: 'streaming' },
  { id: 'tubi', name: 'Tubi', url: 'https://tubitv.com/', logo: 'logos/tubitv.png', category: 'streaming' },
  { id: 'youtube', name: 'YouTube', url: 'https://www.youtube.com', logo: 'logos/youtube.png', category: 'streaming' },
  // Télé / TV
  { id: 'bell', name: 'Bell Fibe TV', url: 'https://tv.bell.ca/', logo: 'logos/bell.png', category: 'tv' },
  { id: 'citytv', name: 'CityTV', url: 'https://www.citytv.com/', logo: 'logos/citytv.png', category: 'tv' },
  { id: 'helix', name: 'Helix TV', url: 'https://helix.videotron.com/', logo: 'logos/helix.png', category: 'tv' },
  { id: 'noovo', name: 'Noovo', url: 'https://noovo.ca/', logo: 'logos/noovo.png', category: 'tv' },
  { id: 'tvaplus', name: 'TVA+', url: 'https://www.qub.ca/tvaplus', logo: 'logos/tvaplus.png', category: 'tv' },
  { id: 'virgintv', name: 'Virgin TV', url: 'https://tv.virginmobile.ca/', logo: 'logos/virgintv.png', category: 'tv' },
  // Sports
  { id: 'dazn', name: 'DAZN', url: 'https://www.dazn.com/', logo: 'logos/dazn.png', category: 'sports' },
  { id: 'rds', name: 'RDS', url: 'https://www.rds.ca/emissions/en-direct', logo: 'logos/rds.png', category: 'sports' },
  { id: 'twitch', name: 'Twitch', url: 'https://www.twitch.com', logo: 'logos/twitch.png', category: 'sports' },
  { id: 'tsn', name: 'TSN', url: 'https://www.tsn.ca', logo: 'logos/tsn.png', category: 'sports' },
  // Musique / Music
  { id: 'ytmusic', name: 'YouTube Music', url: 'https://music.youtube.com', logo: 'logos/ytmusic.png', category: 'music' },
  { id: 'ohdio', name: 'Ohdio', url: 'https://ici.radio-canada.ca/ohdio', logo: 'logos/ohdio.png', category: 'music' },
  { id: 'tunein', name: 'TuneIn', url: 'https://tunein.com', logo: 'logos/tunein.png', category: 'music' },
  // Jeux / Games
  { id: 'chess', name: 'Chess.com', url: 'https://www.chess.com/play', logo: 'logos/chess.png', category: 'games' },
  { id: 'poki', name: 'Poki', url: 'https://poki.com', logo: 'logos/poki.png', category: 'games' },
  // Outils / Tools
  { id: 'gmaps', name: 'Google Maps', url: 'https://www.google.com/maps', logo: 'logos/gmaps.png', category: 'tools' },
  { id: 'wazelive', name: 'Waze Live Map', url: 'https://www.waze.com/live-map', logo: 'logos/waze.png', category: 'tools' },
  { id: 'abrp', name: 'ABRP', url: 'https://abetterrouteplanner.com', logo: 'logos/abrp.png', category: 'tools' },
  { id: 'plugshare', name: 'PlugShare', url: 'https://www.plugshare.com', logo: 'logos/plugshare.png', category: 'tools' },
  { id: 'windy', name: 'Windy', url: 'https://www.windy.com', logo: 'logos/windy.png', category: 'tools' },
  { id: 'meteomedia', name: 'MétéoMédia', url: 'https://www.meteomedia.com', logo: 'logos/meteomedia.png', category: 'tools' },
  { id: 'yelp', name: 'Yelp', url: 'https://www.yelp.ca', logo: 'logos/yelp.png', category: 'tools' },
]

const stripAccents = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export function matchesQuery(service: Service, query: string): boolean {
  const q = stripAccents(query.trim())
  if (!q) return true
  return stripAccents(service.name).includes(q) || service.id.includes(q)
}
