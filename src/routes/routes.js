import Login from '../modules/access';
import User from '../modules/user';
import Admin from '../modules/admin';
import BookManager from '../modules/manager';
import PageNotFound from '../common/main-pages/PageNotFound';

export default [
  {
    key: '/',
    path: '/',
    component: Login,
    exact: true,
  },
  {
    key: '/user',
    path: '/user',
    component: User,
    exact: false,
  },
  {
    key: '/admin',
    path: '/admin',
    component: Admin,
    exact: false,
  },
  {
    key: '/manager',
    path: '/manager',
    component: BookManager,
    exact: false,
  },
  {
    key: '*',
    path: '*',
    component: PageNotFound,
    exact: false,
  },
];
