import React from 'react';
import {Container, Jumbotron} from 'react-bootstrap';
import SystemLogList from '../../components/SystemLogList';

const Page = () => {
  return (
    <>
      <Jumbotron bsPrefix="page-header" fluid>
        <Container className="inner-container">
          <h1 style={{color: '#6C4CC5'}}>System Logs</h1>
          <p>Manage activities in your online library.</p>
        </Container>
      </Jumbotron>

      <div className="content-container">
        <SystemLogList />
      </div>
    </>
  );
};

export default Page;
