const CACHE_TTL_MS = 60_000
const MAX_CACHE_ENTRIES = 100
const cache = new Map()

export function getCachedRequest(key, loader, ttl = CACHE_TTL_MS) {
  const cached = cache.get(key)
  if (cached?.promise) return cached.promise
  if (cached && cached.expiresAt > Date.now()) return Promise.resolve(cached.value)

  const entry = {}
  const promise = Promise.resolve()
    .then(loader)
    .then((value) => {
      if (cache.get(key) === entry) {
        cache.set(key, { value, expiresAt: Date.now() + ttl })
        while (cache.size > MAX_CACHE_ENTRIES) {
          cache.delete(cache.keys().next().value)
        }
      }
      return value
    })
    .catch((error) => {
      if (cache.get(key) === entry) cache.delete(key)
      throw error
    })

  entry.promise = promise
  cache.set(key, entry)
  return promise
}

export function invalidateCachedRequests(prefix) {
  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) cache.delete(key)
  }
}

export async function fetchAllPages(fetchPage, pageSize = 500) {
  const rows = []
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await fetchPage(from, from + pageSize - 1)
    if (error) throw error
    const page = data || []
    rows.push(...page)
    if (page.length < pageSize) return rows
  }
}
