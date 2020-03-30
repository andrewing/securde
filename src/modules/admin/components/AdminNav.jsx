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
          <img alt="" src="/book.png" width="20" height="20" />
        </Navbar.Brand>
      </NavLink>
      <Nav className="mr-auto">
        <NavLink
          to={`${url}/book-manager`}
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
    </Navbar>
  </>
);

AdminPageNavbar.propTypes = {
  url: PropTypes.string.isRequired,
};

export default AdminPageNavbar;
