import React from 'react';
import PropTypes from 'prop-types';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookManagerNav = ({url}) => (
  <>
    <Navbar expand="lg" bg="dark" variant="dark" style={{height: '60px'}}>
      <Navbar.Brand>
        <img alt="" src="/book.png" width="20" height="20" />
      </Navbar.Brand>
      <Nav className="mr-auto">
        <NavLink
          to={`${url}/manage-books`}
          style={{color: 'white', textDecoration: 'none', margin: 10}}
          activeStyle={{color: '#A7A1FF'}}
        >
          All Books
        </NavLink>
        <NavLink
          to={`${url}/manage-book-instances`}
          style={{color: 'white', textDecoration: 'none', margin: 10}}
          activeStyle={{color: '#A7A1FF'}}
        >
          All Book Instances
        </NavLink>
      </Nav>
    </Navbar>
  </>
);

BookManagerNav.propTypes = {
  url: PropTypes.string.isRequired,
};

export default BookManagerNav;
