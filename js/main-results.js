import { initTheme } from './theme.js';
import { initSearch } from './search.js';
import { initResults } from './results.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSearch({ inputId: 'qinput', formId: 'qform' });
    initResults();
});
