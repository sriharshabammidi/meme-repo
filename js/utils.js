import { CONFIG } from './config.js';

let _metaCache = null;

export async function fetchMeta() {
    if (_metaCache) return _metaCache;
    const resp = await fetch(CONFIG.MEME_BASE_URL + CONFIG.METADATA_FILENAME);
    if (!resp.ok) throw new Error('Failed to fetch meta-data.json: ' + resp.status);
    _metaCache = await resp.json();
    return _metaCache;
}

export function escapeHtml(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export function debounce(fn, wait) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
    };
}

export function getParams() { return new URLSearchParams(location.search); }
