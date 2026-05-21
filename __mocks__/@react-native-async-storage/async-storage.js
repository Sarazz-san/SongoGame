const storage = new Map();

const asString = (v) => (typeof v === 'string' ? v : v == null ? null : String(v));

module.exports = {
  setItem: async (key, value) => {
    storage.set(key, asString(value));
    return null;
  },
  getItem: async (key) => {
    return storage.has(key) ? storage.get(key) : null;
  },
  removeItem: async (key) => {
    storage.delete(key);
    return null;
  },
  clear: async () => {
    storage.clear();
    return null;
  },
  getAllKeys: async () => Array.from(storage.keys()),
  multiGet: async (keys) => keys.map((k) => [k, storage.has(k) ? storage.get(k) : null]),
  multiSet: async (pairs) => {
    for (const [k, v] of pairs) storage.set(k, asString(v));
    return null;
  },
  multiRemove: async (keys) => {
    for (const k of keys) storage.delete(k);
    return null;
  },
  mergeItem: async (key, value) => {
    // naive merge: overwrite
    storage.set(key, asString(value));
    return null;
  },
};

