import React from 'react';
import {useRouteMatch} from 'react-router-dom';
import BookManagerNav from './components/BookManagerNav';
import Subpages from './pages';

const Page = props => {
  const {url, path} = useRouteMatch();
  return (
    <>
      <BookManagerNav url={url} />

      <Subpages path={path} props={props} />
    </>
  );
};

export default Page;
