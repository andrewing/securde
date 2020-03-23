import React from 'react';
import {useRouteMatch} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import AdminNav from './components/AdminNav';
import Subpages from './pages';

const Page = () => {
  const {url, path} = useRouteMatch();
  return (
    <>
      <AdminNav url={url} />
      <Container>
        <h1>Welcome Admin!</h1>
        <Subpages path={path} />
      </Container>
    </>
  );
};

export default Page;
