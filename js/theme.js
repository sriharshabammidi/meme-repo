import { } from './utils.js';

export function initTheme() {
    let themeToggle = document.getElementById('themeToggle');

    function createToggle() {
        const btn = document.createElement('button');
        btn.id = 'themeToggle';
        btn.className = 'theme-toggle';
        btn.type = 'button';
        btn.title = 'Toggle theme';
        document.body.appendChild(btn);
        return btn;
    }

    if (!themeToggle) themeToggle = createToggle();

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        themeToggle.textContent = theme === 'dark' ? '𖤓' : '☾';
        themeToggle.setAttribute('aria-pressed', String(theme === 'light'));
    }

    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (prefersDark ? 'dark' : 'light');
    applyTheme(initial);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        applyTheme(next);
    });
}
