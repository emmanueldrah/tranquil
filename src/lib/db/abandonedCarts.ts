import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'tranquil.db');

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const db = new Database(DB_PATH);

// Initialize table
db.exec(`
  CREATE TABLE IF NOT EXISTS abandoned_carts (
    id TEXT PRIMARY KEY,
    items TEXT,
    total REAL,
    userEmail TEXT,
    createdAt TEXT,
    sentAt TEXT
  );
`);

export interface AbandonedCartRow {
  id: string;
  items: any[];
  total: number;
  userEmail?: string | null;
  createdAt: string;
  sentAt?: string | null;
}

export function addSnapshot(snapshot: AbandonedCartRow) {
  const stmt = db.prepare(`INSERT OR REPLACE INTO abandoned_carts (id, items, total, userEmail, createdAt, sentAt) VALUES (?, ?, ?, ?, ?, ?)`);
  stmt.run(snapshot.id, JSON.stringify(snapshot.items || []), snapshot.total ?? 0, snapshot.userEmail ?? null, snapshot.createdAt, snapshot.sentAt ?? null);
}

export function getAllSnapshots(): AbandonedCartRow[] {
  const rows = db.prepare('SELECT * FROM abandoned_carts ORDER BY createdAt DESC').all();
  return rows.map((r: any) => ({
    id: r.id,
    items: JSON.parse(r.items || '[]'),
    total: r.total,
    userEmail: r.userEmail,
    createdAt: r.createdAt,
    sentAt: r.sentAt,
  }));
}

export function getUnsentSnapshots(): AbandonedCartRow[] {
  const rows = db.prepare('SELECT * FROM abandoned_carts WHERE sentAt IS NULL ORDER BY createdAt DESC').all();
  return rows.map((r: any) => ({
    id: r.id,
    items: JSON.parse(r.items || '[]'),
    total: r.total,
    userEmail: r.userEmail,
    createdAt: r.createdAt,
    sentAt: r.sentAt,
  }));
}

export function markSent(id: string) {
  const stmt = db.prepare('UPDATE abandoned_carts SET sentAt = ? WHERE id = ?');
  stmt.run(new Date().toISOString(), id);
}

export function clearForUser(userEmail?: string | null) {
  if (!userEmail) return;
  const stmt = db.prepare('DELETE FROM abandoned_carts WHERE userEmail = ?');
  stmt.run(userEmail);
}

export function clearAllSnapshots() {
  db.prepare('DELETE FROM abandoned_carts').run();
}
