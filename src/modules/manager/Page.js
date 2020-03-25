import React from 'react';
import {useRouteMatch} from 'react-router-dom';
import {Container, Jumbotron} from 'react-bootstrap';
import BookManagerNav from './components/BookManagerNav';
import Subpages from './pages';

const Page = () => {
  const {url, path} = useRouteMatch();
  return (
    <>
      <BookManagerNav url={url} />

      <Jumbotron fluid>
        <Container>
          <h1>Welcome Username!</h1>
          <p>Manage books and book instances here!</p>
        </Container>
      </Jumbotron>

      <Container>
        <h1>Welcome Book Manager!</h1>
        <Subpages path={path} />
      </Container>
    </>
  );
};

export default Page;
