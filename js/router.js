import { renderResultsRoute } from './results.js';

function parseSearch(search) {
    const params = new URLSearchParams(search);
    return {
        q: params.get('q') || null,
        id: params.get('id') || null
    };
}

export function navigate(params = {}) {
    const sp = new URLSearchParams();
    if (params.q) sp.set('q', params.q);
    if (params.id) sp.set('id', params.id);
    const url = (sp.toString() ? '?' + sp.toString() : location.pathname);
    history.pushState({}, '', url);
    route();
}

export function route() {
    const { q, id } = parseSearch(location.search);
    // show results view when q or id present; otherwise hide it
    const appRoot = document.getElementById('app-root');
    const searchCard = document.querySelector('.search-card');

    if (q || id) {
        document.body.classList.add('page-results');
        if (appRoot) appRoot.hidden = false;
        if (searchCard) searchCard.hidden = true;
        renderResultsRoute({ q, id });
        // ensure viewport is at top when navigating to results
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // clear results
        document.body.classList.remove('page-results');
        if (appRoot) { appRoot.hidden = true; appRoot.innerHTML = ''; }
        if (searchCard) searchCard.hidden = false;
    }
}

export function start() {
    // Intercept clicks on internal links to handle SPA navigation
    document.addEventListener('click', (ev) => {
        const a = ev.target.closest && ev.target.closest('a');
        if (!a || !a.href) return;
        const url = new URL(a.href, location.href);
        // Only handle same-origin links
        if (url.origin !== location.origin) return;

        // If link contains q or id params, navigate SPA-style
        if (url.searchParams.has('q') || url.searchParams.has('id')) {
            ev.preventDefault();
            const q = url.searchParams.get('q');
            const id = url.searchParams.get('id');
            navigate({ q, id });
            return;
        }

        // If link points to index.html or root without search, treat as SPA home navigation
        const path = url.pathname.replace(/\/+$|^\//g, ''); // trim leading/trailing slashes
        if (path === '' || path === 'index.html') {
            if (location.search) {
                ev.preventDefault();
                navigate({});
            } else {
                // If already at home, prevent full reload
                if (url.href === location.href) ev.preventDefault();
            }
        }
    });

    window.addEventListener('popstate', () => route());

    // initial route
    route();
}
