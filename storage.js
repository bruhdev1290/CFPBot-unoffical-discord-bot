import fs from 'fs';
import path from 'path';
const DATA_DIR = path.resolve(process.cwd(), 'data');
const KV_FILE = path.join(DATA_DIR, 'kv.json');

function ensure() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
  if (!fs.existsSync(KV_FILE)) fs.writeFileSync(KV_FILE, JSON.stringify({}), 'utf8');
}

export function loadKV() {
  ensure();
  try {
    const raw = fs.readFileSync(KV_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveKV(obj) {
  ensure();
  fs.writeFileSync(KV_FILE, JSON.stringify(obj, null, 2), 'utf8');
}