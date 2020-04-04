import React from 'react';
import Userprofile from './userprofile';
import AllBooks from './allbooks';
import ViewBook from './viewbook';
import PageNotFound from '../../../common/main-pages/PageNotFound';

const subpages = [
  {
    key: '/books',
    path: '/books',
    component: props => <AllBooks props={props} />,
    exact: true,
  },
  {
    key: '/books/:title',
    path: '/books/:title',
    component: props => <ViewBook props={props} />,
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
