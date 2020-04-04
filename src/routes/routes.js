import User from '../modules/user';
import Admin from '../modules/admin';
import BookManager from '../modules/manager';

export default [
  {
    key: '/user',
    path: '/user',
    component: User,
    exact: true,
  },
  {
    key: '/admin',
    path: '/admin',
    component: Admin,
    exact: true,
  },
  {
    key: '/manager',
    path: '/manager',
    component: BookManager,
    exact: true,
  },
];
