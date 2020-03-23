import React from 'react';
import {useRouteMatch} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import BookManagerNav from './components/BookManagerNav';
import Subpages from './pages';

const Page = () => {
  const {url, path} = useRouteMatch();
  return (
    <>
      <BookManagerNav url={url} />
      <Container>
        <h1>Welcome Book Manager!</h1>
        <Subpages path={path} />
      </Container>
    </>
  );
};

export default Page;
