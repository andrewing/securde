import ManageBooks from './books';
import ManageBookInstances from './bookinstances';
import PageNotFound from '../../../common/main-pages/PageNotFound';

const subpages = [
  {
    key: '/manage-books',
    path: '/manage-books',
    component: ManageBooks,
  },
  {
    key: '/manage-book-instances',
    path: '/manage-book-instances',
    component: ManageBookInstances,
  },
  {
    key: '/*',
    path: '/*',
    component: PageNotFound,
    exact: false,
  },
];

export default subpages;
