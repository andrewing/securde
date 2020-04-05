import React from 'react';
import PropTypes from 'prop-types';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookManagerNav = ({url}) => (
  <>
    <Navbar expand="lg" bg="dark" variant="dark" style={{height: '60px'}}>
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
          Manager Page
        </span>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <NavLink
          to={`${url}/manage-books`}
          style={{color: 'white', textDecoration: 'none', margin: 10}}
          activeStyle={{color: '#A7A1FF'}}
        >
          All Books
        </NavLink>
      </Nav>
      <NavLink to="/">
        <Navbar.Brand>
          <img
            alt=""
            src="/logout.png"
            width="20"
            height="20"
            className="logout"
          />
          <span className="logout-link">Log Out</span>
        </Navbar.Brand>
      </NavLink>
    </Navbar>
  </>
);

BookManagerNav.propTypes = {
  url: PropTypes.string.isRequired,
};

export default BookManagerNav;
