import React from 'react';
import PropTypes from 'prop-types';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPageNavbar = ({url}) => (
  <>
    <Navbar expand="lg" bg="dark" variant="dark" style={{height: '60px'}}>
      <NavLink to={`${url}`}>
        <Navbar.Brand>
          <img alt="" src="/logo.png" width="45" height="45" />
        </Navbar.Brand>
      </NavLink>
      <Nav className="mr-auto">
        <NavLink
          to={`${url}/book-managers`}
          style={{color: 'white', textDecoration: 'none', margin: 10}}
          activeStyle={{textDecoration: 'underline'}}
        >
          Book Managers
        </NavLink>
        <NavLink
          to={`${url}/view-logs`}
          style={{color: 'white', textDecoration: 'none', margin: 10}}
          activeStyle={{textDecoration: 'underline'}}
        >
          View Logs
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
        </Navbar.Brand>
      </NavLink>
    </Navbar>
  </>
);

AdminPageNavbar.propTypes = {
  url: PropTypes.string.isRequired,
};

export default AdminPageNavbar;
