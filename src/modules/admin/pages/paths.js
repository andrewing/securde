import ViewLogs from './logs';
import CreateManager from './create';
import PageNotFound from '../../../common/main-pages/PageNotFound';

const subpages = [
  {
    key: '/view-logs',
    path: '/view-logs',
    component: ViewLogs,
  },
  {
    key: '/create-manager',
    path: '/create-manager',
    component: CreateManager,
  },
  {
    key: '/*',
    path: '/*',
    component: PageNotFound,
    exact: false,
  },
];

export default subpages;
