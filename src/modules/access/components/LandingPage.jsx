/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Container, Jumbotron, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = props => {
  return (
    <Jumbotron fluid>
      <Container>
        <h1>Welcome To Online Library</h1>
        <p>You can access the online library as follows</p>{' '}
        <Button
          style={{backgroundColor: '#6C63FF'}}
          onClick={e => props.onClickAccess(e.target.innerText)}
        >
          Access as a User
        </Button>{' '}
        <Button
          style={{backgroundColor: '#6C63FF'}}
          onClick={e => props.onClickAccess(e.target.innerText)}
        >
          Access as an Admin
        </Button>{' '}
        <Button
          style={{backgroundColor: '#6C63FF'}}
          onClick={e => props.onClickAccess(e.target.innerText)}
        >
          Access as a Book Manager
        </Button>
      </Container>
    </Jumbotron>
  );
};

LoginPage.propTypes = {
  onClickAccess: PropTypes.func,
};

export default LoginPage;
