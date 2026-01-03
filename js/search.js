import { escapeHtml, debounce, fetchMeta } from './utils.js';
import { navigate } from './router.js';
import { CONFIG } from './config.js';

export async function initSearch(opts = {}) {
    const inputId = opts.inputId || 'q';
    const suggestionsId = opts.suggestionsId || 'suggestions';
    const formId = opts.formId || 'searchForm';

    const input = document.getElementById(inputId);
    const suggestionsEl = document.getElementById(suggestionsId);
    const form = document.getElementById(formId);
    if (!input || !form) return; // nothing to do on this page

    let metaData = [];
    let visibleItems = [];
    let focused = -1;
    let ignoreBlur = false;

    async function load() {
        metaData = await fetchMeta();
    }
    load().catch(console.error);

    function renderSuggestions(items) {
        visibleItems = items.slice(0, 20);
        if (!visibleItems.length) {
            if (suggestionsEl) { suggestionsEl.hidden = true; suggestionsEl.innerHTML = ''; }
            return;
        }
        if (!suggestionsEl) return;

        suggestionsEl.hidden = false;
        suggestionsEl.innerHTML = visibleItems.map((it, idx) => {
            const thumb = it.File ? CONFIG.MEME_BASE_URL + CONFIG.IMAGE_DIRECTORY + encodeURIComponent(it.File) : '';
            return `
        <div class="suggestion-item" role="option" data-index="${idx}" data-name="${escapeHtml(it.Name || '')}">
          <img src="${escapeHtml(thumb)}" alt="${escapeHtml(it.Name || '')} thumbnail" onerror="this.style.display='none'">
          <div class="suggestion-text">${escapeHtml(it.Name || '')}</div>
        </div>`;
        }).join('');
        focused = -1;
    }

    function updateSuggestions(query) {
        const q = String(query || '').trim().toLowerCase();
        const results = [];
        const seen = new Set();

        if (!q) {
            for (const it of metaData) {
                if (it.Name && !seen.has(it.Name)) { results.push(it); seen.add(it.Name); if (results.length >= 20) break; }
            }
            renderSuggestions(results); return;
        }

        for (const it of metaData) {
            const name = it.Name || '';
            const kws = Array.isArray(it.Keywords) ? it.Keywords : [];
            if (name.toLowerCase().includes(q) || kws.some(k => String(k).toLowerCase().includes(q))) {
                if (!seen.has(name)) { results.push(it); seen.add(name); if (results.length >= 20) break; }
            }
        }

        renderSuggestions(results);
    }

    input.addEventListener('input', debounce((e) => updateSuggestions(e.target.value), 120));

    if (suggestionsEl) {
        suggestionsEl.addEventListener('mousedown', () => { ignoreBlur = true; });
        document.addEventListener('mouseup', () => { setTimeout(() => { ignoreBlur = false; }, 0); });

        suggestionsEl.addEventListener('click', (e) => {
            const itemEl = e.target.closest('.suggestion-item');
            if (!itemEl) return;
            const idx = Number(itemEl.dataset.index);
            const it = visibleItems[idx];
            if (it) selectSuggestion(it);
        });
    }

    input.addEventListener('blur', () => {
        setTimeout(() => { if (ignoreBlur) return; const ae = document.activeElement; if (ae && ae.closest && ae.closest('.search-card')) return; if (suggestionsEl) suggestionsEl.hidden = true; focused = -1; }, 0);
    });

    input.addEventListener('focus', () => updateSuggestions(input.value));

    input.addEventListener('keydown', (ev) => {
        if (!suggestionsEl) return;
        const items = suggestionsEl.querySelectorAll('.suggestion-item');
        if (ev.key === 'ArrowDown') { ev.preventDefault(); if (items.length) { focused = Math.min(focused + 1, items.length - 1); updateFocus(items); } }
        else if (ev.key === 'ArrowUp') { ev.preventDefault(); if (items.length) { focused = Math.max(focused - 1, 0); updateFocus(items); } }
        else if (ev.key === 'Enter') {
            if (focused >= 0 && items[focused]) { ev.preventDefault(); const idx = Number(items[focused].dataset.index); const it = visibleItems[idx]; if (it) selectSuggestion(it); }
            else { ev.preventDefault(); form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })); }
        } else if (ev.key === 'Escape') { if (suggestionsEl) suggestionsEl.hidden = true; focused = -1; }
    });

    function updateFocus(items) { items.forEach((el, i) => el.setAttribute('aria-selected', i === focused ? 'true' : 'false')); const el = items[focused]; if (el) el.scrollIntoView({ block: 'nearest' }); }

    function selectSuggestion(it) { const id = encodeURIComponent(it.Id || it.File || it.Name || ''); if (!id) return; navigate({ id }); }

    // Submit handling
    form.addEventListener('submit', (e) => {
        e.preventDefault(); const q = input.value.trim(); if (!q) return; navigate({ q });
    });
}
