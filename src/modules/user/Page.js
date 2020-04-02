/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {useRouteMatch} from 'react-router-dom';
import UserNav from './components/UserNav';
import Subpages from './pages';
import './index.css';

const Page = () => {
  const {url, path} = useRouteMatch();
  return (
    <>
      <UserNav url={url} />
      <Subpages path={path} />
    </>
  );
};

export default Page;
