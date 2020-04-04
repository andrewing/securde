/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserPageNavbar = ({url}) => {
  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark" style={{height: '60px'}}>
        <NavLink to={`${url}/books`}>
          <Navbar.Brand>
            <img alt="" src="/logo.png" width="45" height="45" />
            <span
              style={{
                fontWeight: 500,
                fontSize: 15,
                marginLeft: 10,
                color: 'white',
              }}
            >
              User Page
            </span>
          </Navbar.Brand>
        </NavLink>
        <Nav className="mr-auto">
          <NavLink
            to={`${url}/books`}
            style={{color: 'white', textDecoration: 'none', margin: 10}}
            activeStyle={{color: '#A7A1FF'}}
          >
            All Books
          </NavLink>
          <NavLink
            to={`${url}/profile`}
            style={{color: 'white', textDecoration: 'none', margin: 10}}
            activeStyle={{color: '#A7A1FF'}}
          >
            View Profile
          </NavLink>
        </Nav>
      </Navbar>
    </>
  );
};

UserPageNavbar.propTypes = {
  url: PropTypes.string.isRequired,
};

export default UserPageNavbar;
