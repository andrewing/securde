import User from '../modules/user';
import Admin from '../modules/admin';
import BookManager from '../modules/manager';

export default [
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
];
