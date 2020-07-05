import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Jumbotron>
      <h1>404: Not Found (´。＿。｀)</h1>
      <p>Sorry, we could not find the page you were asking for</p>
      <p>
        <Button>
          <Link to="/" style={{color: 'white'}}>
            Take Me Back!
          </Link>
        </Button>
      </p>
    </Jumbotron>
  );
};

export default PageNotFound;
