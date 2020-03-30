import ViewLogs from './logs';
import BookManager from './book-manager';
import PageNotFound from '../../../common/main-pages/PageNotFound';

const subpages = [
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
