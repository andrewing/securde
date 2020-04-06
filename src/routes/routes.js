import User from '../modules/user';
import Admin from '../modules/admin';
import {AUDIENCE} from '../util/constants';
import BookManager from '../modules/manager';

export default [
  {
    key: '/user',
    path: '/user',
    component: User,
    type: AUDIENCE.USER_STUDENT || AUDIENCE.USER_TEACHER,
    exact: false,
  },
  {
    key: '/admin',
    path: '/admin',
    component: Admin,
    type: AUDIENCE.ADMIN,
    exact: false,
  },
  {
    key: '/manager',
    path: '/manager',
    type: AUDIENCE.BOOK_MANAGER,
    component: BookManager,
    exact: false,
  },
];
