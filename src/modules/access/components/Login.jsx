import React, {Component} from 'react';
import {Container, Jumbotron, Button, Form, Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

const UserLogin = ({selectedAccess}) => {
  return (
    <div className="custom-col">
      <div
        style={{
          paddingTop: 40,
          marginLeft: 190,
          width: 350,
        }}
      >
        <h1>Login as {selectedAccess}</h1>
        <Form style={{paddingTop: 30}}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <div style={{display: 'flex'}}>
            <Button style={{backgroundColor: '#6C63FF'}} type="submit">
              Log In
            </Button>
            {selectedAccess !== 'Manager' && (
              <Button style={{color: '#6C63FF'}} variant="link">
                Sign Up
              </Button>
            )}
          </div>
        </Form>
      </div>

      {selectedAccess === 'User' && (
        <img alt="user" src="./landing_page.png" className="image-placement" />
      )}

      {selectedAccess === 'Admin' && (
        <img alt="admin" src="./admin.png" className="image-placement" />
      )}

      {selectedAccess === 'Manager' && (
        <img alt="manager" src="./manager.png" className="image-placement" />
      )}
    </div>
  );
};

UserLogin.propTypes = {
  selectedAccess: PropTypes.string,
};

export default UserLogin;
