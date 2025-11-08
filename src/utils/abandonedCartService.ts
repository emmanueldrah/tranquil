export interface AbandonedCartSnapshot {
  id: string;
  items: any[];
  total: number;
  userEmail?: string | null;
  createdAt: string; // ISO
}

const STORAGE_KEY = 'abandoned_carts';

function readStorage(): AbandonedCartSnapshot[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (err) {
    console.error('Failed to read abandoned carts from storage', err);
    return [];
  }
}

function writeStorage(list: AbandonedCartSnapshot[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to write abandoned carts to storage', err);
  }
}

export function saveAbandonedCartSnapshot(payload: { items: any[]; total?: number; userEmail?: string | null }) {
  const snapshot: AbandonedCartSnapshot = {
    id: `ac_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    items: payload.items,
    total: payload.total ?? payload.items.reduce((s, it) => s + ((it.product?.price || 0) * (it.quantity || 1)), 0),
    userEmail: payload.userEmail ?? null,
    createdAt: new Date().toISOString(),
  };

  // Try to POST to server API; if unavailable, fall back to localStorage
  try {
    if (typeof fetch !== 'undefined') {
      fetch('/api/abandoned-carts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(snapshot),
      }).then((res) => {
        if (!res.ok) {
          // fallback to local
          const list = readStorage();
          list.push(snapshot);
          writeStorage(list);
        }
      }).catch((err) => {
        const list = readStorage();
        list.push(snapshot);
        writeStorage(list);
      });

      return snapshot;
    }
  } catch (err) {
    // ignore and fallback
  }

  const list = readStorage();
  list.push(snapshot);
  writeStorage(list);
  return snapshot;
}

export function getAbandonedCartSnapshots(): AbandonedCartSnapshot[] {
  return readStorage();
}

export function clearAbandonedCartForUser(userEmail?: string | null) {
  if (!userEmail) return;
  const list = readStorage().filter((s) => s.userEmail !== userEmail);
  writeStorage(list);
}

export function clearAllAbandonedCartSnapshots() {
  writeStorage([]);
}
