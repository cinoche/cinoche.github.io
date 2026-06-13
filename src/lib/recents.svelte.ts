const STORAGE_KEY = 'cinoche-recents'
const MAX = 8

function load(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

class Recents {
  ids = $state<string[]>(load())

  record(id: string): void {
    this.ids = [id, ...this.ids.filter((x) => x !== id)].slice(0, MAX)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ids))
  }
}

export const recents = new Recents()
