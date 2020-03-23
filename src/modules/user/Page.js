/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {useRouteMatch} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import UserNav from './components/UserNav';
import Subpages from './pages';
import './index.css';

const Page = () => {
  const {url, path} = useRouteMatch();
  return (
    <>
      <UserNav url={url} />
      <Container>
        <h1>Welcome User!</h1>
        <Subpages path={path} />
      </Container>
    </>
  );
};

export default Page;
