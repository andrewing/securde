import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PageNotFound = () => {
  return (
    <Jumbotron>
      <h1>404: Not Found (´。＿。｀)</h1>
      <p>Sorry, we could not find the page you were asking for</p>
      <p>
        <Button>Take Me Back!</Button>
      </p>
    </Jumbotron>
  );
};

export default PageNotFound;
