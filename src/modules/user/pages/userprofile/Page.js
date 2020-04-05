import React from 'react';
import {Jumbotron, Container} from 'react-bootstrap';
import UserInfo from '../../components/UserInfo';
import UserLogs from '../../components/UserLogs';

const Page = () => {
  return (
    <>
      <Jumbotron bsPrefix="page-header" fluid>
        <h1 style={{color: '#6C4CC5'}}>Your Profile</h1>
      </Jumbotron>
    </>
  );
};

export default Page;
