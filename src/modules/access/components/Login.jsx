import React, {Component} from 'react';
import {Button, Form} from 'react-bootstrap';
import PropTypes from 'prop-types';

const UserLogin = ({selectedAccess, onClickShow}) => {
  return (
    <div className="custom-col">
      <div
        style={{
          paddingTop: 10,
          marginLeft: 190,
          width: 350,
        }}
      >
        <h1>Login as {selectedAccess}</h1>
        <Form style={{paddingTop: 10}}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              autoComplete="off"
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />

            {selectedAccess !== 'Manager' && (
              <Button style={{color: '#6C63FF'}} variant="link">
                Forgot Password?
              </Button>
            )}
          </Form.Group>

          <div style={{display: 'flex', paddingTop: 10}}>
            <Button bsPrefix="primary-button" type="submit">
              Log In
            </Button>

            {selectedAccess !== 'Manager' && (
              <Button
                style={{color: '#6C63FF'}}
                variant="link"
                onClick={onClickShow}
              >
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
  onClickShow: PropTypes.func,
};

export default UserLogin;
