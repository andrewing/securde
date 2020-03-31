import React from 'react';
import {useRouteMatch} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import AdminNav from './components/AdminNav';
import Subpages from './pages';
import './pages/index.css';

const Page = () => {
  const {url, path} = useRouteMatch();
  return (
    <>
      <AdminNav url={url} />
      <Container className='container'>
        <Subpages path={path} />
      </Container>
    </>
  );
};

export default Page;
