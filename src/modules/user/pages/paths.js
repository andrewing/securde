import Userprofile from './userprofile';
import AllBooks from './allbooks';
import PageNotFound from '../../../common/main-pages/PageNotFound';

const subpages = [
  {
    key: '/books',
    path: '/books',
    component: AllBooks,
  },
  {
    key: '/profile',
    path: '/profile',
    component: Userprofile,
  },
  {
    key: '/*',
    path: '/*',
    component: PageNotFound,
    exact: false,
  },
];

export default subpages;
