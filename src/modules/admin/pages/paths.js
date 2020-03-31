import ViewLogs from './logs';
import BookManager from './book-manager';
import Home from './home';
import PageNotFound from '../../../common/main-pages/PageNotFound';

const subpages = [
  {
    key: '/home',
    path: '/home',
    component: Home,
  },
  {
    key: '/view-logs',
    path: '/view-logs',
    component: ViewLogs,
  },
  {
    key: '/book-manager',
    path: '/book-manager',
    component: BookManager,
  },
  {
    key: '/*',
    path: '/*',
    component: PageNotFound,
    exact: false,
  },
];

export default subpages;
