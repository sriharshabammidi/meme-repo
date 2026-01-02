import { escapeHtml, fetchMeta, getParams } from './utils.js';

export async function renderResultsRoute({ q = null, id = null } = {}) {
    // Ensure we render inside the SPA mount point
    let root = document.getElementById('app-root');
    if (!root) {
        // fallback to older `main` selector for non-SPA usage
        root = document.getElementById('main') || document.body;
    }

    const qinput = document.getElementById('qinput');
    if (qinput) qinput.value = q || '';

    let data;
    try { data = await fetchMeta(); }
    catch (err) { root.innerHTML = '<div class="empty">Failed to load metadata.</div>'; console.error(err); return; }

    if (id) {
        const decoded = decodeURIComponent(id);
        const item = data.find(it => (it.Id === decoded) || (encodeURIComponent(it.Id) === id) || (it.File === decoded) || (it.Name === decoded) || (encodeURIComponent(it.File) === id));
        if (item) { renderSingle(item, root); }
        else { root.innerHTML = '<div class="empty">Item not found</div>' }
        return;
    }

    // No id -> search grid
    const ql = String(q || '').trim().toLowerCase();
    if (!ql) { renderGrid([], '', root); return; }
    const results = [];
    const seen = new Set();
    for (const it of data) {
        const name = (it.Name || '').toLowerCase();
        const kws = (it.Keywords || []).map(k => String(k).toLowerCase());
        if (name.includes(ql) || kws.some(k => k.includes(ql))) {
            if (!seen.has(it.Id)) { results.push(it); seen.add(it.Id); }
        }
    }
    renderGrid(results, q, root);

    // notify the app that we rendered results (so other modules can attach handlers)
    setTimeout(() => {
        document.dispatchEvent(new CustomEvent('spa:rendered', { detail: { view: 'results' } }));
    }, 0);

    function renderSingle(item, mount) {
        const keywords = Array.isArray(item.Keywords) ? item.Keywords : [];
        mount.innerHTML = `
      <div class="container">
        <div class="top">
          <a class="back" href="index.html">← Back</a>
          <form id="qform" class="search-inline" action="results.html" method="get">
            <input id="qinput" name="q" type="search" value="${escapeHtml(q || '')}" placeholder="Search memes...">
            <button type="submit">Search</button>
          </form>
        </div>
        <div class="single">
          <h1>${escapeHtml(item.Name || '')}</h1>
          <div class="image-wrap">
            <img id="singleImage" src="${escapeHtml('memes/' + encodeURIComponent(item.File || ''))}" alt="${escapeHtml(item.Name || '')}">
            <div class="image-actions">
              <button id="downloadBtn" class="action-btn" aria-label="Download image" title="Download">⬇</button>
            </div>
            <div id="actionStatus" class="action-status" aria-live="polite"></div>
          </div>
          <div class="tags">${keywords.map(k => `<a class="tag" href="?q=${encodeURIComponent(k)}">${escapeHtml(k)}</a>`).join('') || '<span class="empty">No tags</span>'}</div>
        </div>
      </div>
    `;

        // attach handlers to the action buttons
        const imgEl = mount.querySelector('#singleImage');
        const downloadBtn = mount.querySelector('#downloadBtn');
        const statusEl = mount.querySelector('#actionStatus');

        function showStatus(text) {
            if (!statusEl) return;
            statusEl.textContent = text;
            statusEl.classList.add('show');
            setTimeout(() => statusEl.classList.remove('show'), 1600);
        }

        if (downloadBtn && imgEl) {
            downloadBtn.addEventListener('click', () => {
                const url = imgEl.src;
                const filename = item.File || 'image';
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
                showStatus('Downloading...');
            });
        }



        setTimeout(() => {
            document.dispatchEvent(new CustomEvent('spa:rendered', { detail: { view: 'results' } }));
        }, 0);
    }

    function renderGrid(items, q, mount) {
        // include top controls (back link + inline search) in grid view
        const header = `
      <div class="top">
        <a class="back" href="index.html">← Back</a>
        <form id="qform" class="search-inline" action="results.html" method="get">
          <input id="qinput" name="q" type="search" value="${escapeHtml(q || '')}" placeholder="Search memes...">
          <button type="submit">Search</button>
        </form>
      </div>`;

        if (!items.length) {
            mount.innerHTML = `<div class="container">${header}<h1>Results${q ? ' for "' + escapeHtml(q) + '"' : ''}</h1><div class="empty">No results found.</div></div>`;
            setTimeout(() => {
                document.dispatchEvent(new CustomEvent('spa:rendered', { detail: { view: 'results' } }));
            }, 0);
            return;
        }

        mount.innerHTML = `<div class="container">${header}<h1>Results${q ? ' for "' + escapeHtml(q) + '"' : ''}</h1><div class="grid">${items.map(it => `
      <a class="card" href="?id=${encodeURIComponent(it.Id || it.File || '')}" title="${escapeHtml(it.Name || '')}">
        <img src="${escapeHtml('memes/' + encodeURIComponent(it.File || ''))}" alt="${escapeHtml(it.Name || '')}">
        <div class="name">${escapeHtml(it.Name || '')}</div>
      </a>`).join('')}</div></div>`;

        setTimeout(() => {
            document.dispatchEvent(new CustomEvent('spa:rendered', { detail: { view: 'results' } }));
        }, 0);
    }
}
