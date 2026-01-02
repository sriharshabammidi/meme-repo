import { initTheme } from './theme.js';
import { initSearch } from './search.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSearch();
    import('./router.js').then(r => r.start());

    // When results view is rendered inside the SPA, attach search handlers to the injected form/input
    document.addEventListener('spa:rendered', (ev) => {
        if (ev.detail && ev.detail.view === 'results') {
            // initialize search for the in-page results form (if present)
            import('./search.js').then(m => {
                m.initSearch({ inputId: 'qinput', formId: 'qform' });
                // Focus and select the input for quicker UX
                setTimeout(() => {
                    const qi = document.getElementById('qinput');
                    if (qi) {
                        try { qi.focus(); qi.select && qi.select(); } catch (e) { /* ignore */ }
                    }
                }, 0);
            });
        }
    });
});
