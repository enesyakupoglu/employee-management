import {initRouter} from './utils/router.js';
import {Store} from './utils/store.js';
import '../src/components/NavigationMenu.js';

window.addEventListener('DOMContentLoaded', () => {
  initRouter();

  Store.loadEmployees();
});
