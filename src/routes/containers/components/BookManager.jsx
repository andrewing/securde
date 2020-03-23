import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserPageNavbar = () => (
  <>
    <Navbar expand="lg" bg="dark" variant="dark" style={{height: '60px'}}>
      <Navbar.Brand href="#">
        <img alt="" src="book.png" width="20" height="20" />
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#">All Books</Nav.Link>
        <Nav.Link href="#">Manage Books</Nav.Link>
      </Nav>
    </Navbar>
    {/* <Container>{props.children}</Container> */}
  </>
);

export default UserPageNavbar;
