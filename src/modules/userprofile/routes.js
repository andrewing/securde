import Loadable from 'react-loadable';
import userprofile from './index';

export default [
  {
    path: '/user/user-profile',
    auth: 'user',
    layout: 'user',
    component: Loadable({
      loader: () => userprofile,
    }),
  },
];
