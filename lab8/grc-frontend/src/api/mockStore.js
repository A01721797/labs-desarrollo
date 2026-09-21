// localStorage-backed stand-in for a REST resource. Same shape as a real API module,
// so components never know the difference.
const delay = (value, ms = 120) => new Promise((resolve) => setTimeout(() => resolve(value), ms));

export function createMockResource(key, seed = []) {
  const storageKey = `grc:${key}`;
  let cache = null;

  const read = () => {
    if (cache) return cache;
    try {
      const raw = localStorage.getItem(storageKey);
      cache = raw ? JSON.parse(raw) : structuredClone(seed);
    } catch {
      cache = structuredClone(seed);
    }
    return cache;
  };
  const write = (data) => {
    cache = data;
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch {
      /* storage unavailable: keep in-memory only */
    }
  };

  return {
    list: () => delay([...read()]),
    get: async (id) => {
      const item = read().find((r) => r.id === id);
      if (!item) throw new Error('Record not found');
      return delay({ ...item });
    },
    create: (payload) => {
      const now = new Date().toISOString();
      const item = { ...payload, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
      write([item, ...read()]);
      return delay(item);
    },
    update: async (id, payload) => {
      const current = read().find((r) => r.id === id);
      if (!current) throw new Error('Record not found');
      const item = { ...current, ...payload, id, updatedAt: new Date().toISOString() };
      write(read().map((r) => (r.id === id ? item : r)));
      return delay(item);
    },
    remove: (id) => {
      write(read().filter((r) => r.id !== id));
      return delay(id);
    },
  };
}
