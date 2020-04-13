import React from 'react';
import ManageBooks from './books';
import ViewBook from './viewbook';
import PageNotFound from '../../../common/main-pages/PageNotFound';

const subpages = [
  {
    key: '/manage-books',
    path: '/manage-books',
    component: props => <ManageBooks props={props} />,
    exact: true,
  },
  {
    key: '/manage-books/:title',
    path: '/manage-books/:title',
    component: props => <ViewBook props={props} />,
  },
  {
    key: '/*',
    path: '/*',
    component: PageNotFound,
    exact: false,
  },
];

export default subpages;
