import {Router} from '@vaadin/router';
import '../pages/HomePage.js';
import '../pages/EmployeePage.js';
import '../pages/SettingsPage.js';

export const initRouter = () => {
  const outlet = document.querySelector('#outlet');
  if (!outlet) {
    console.error(
      'Router outlet not found! Make sure <div id="outlet"></div> exists in index.html.'
    );
    return;
  }

  const router = new Router(outlet);
  router.setRoutes([
    {path: '/', component: 'home-page'},
    {path: '/employees', component: 'employee-page'},
    {path: '/settings', component: 'settings-page'},
    {path: '(.*)', redirect: '/'},
  ]);
};
