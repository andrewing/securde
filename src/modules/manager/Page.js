import React, {useEffect} from 'react';
import {useRouteMatch} from 'react-router-dom';
import BookManagerNav from './components/BookManagerNav';
import Subpages from './pages';

const Page = () => {
  const {url, path} = useRouteMatch();

  return (
    <>
      <BookManagerNav url={url} />

      <Subpages path={path} />
    </>
  );
};

export default Page;
