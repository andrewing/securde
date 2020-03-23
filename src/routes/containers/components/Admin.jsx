import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserPageNavbar = props => (
  <>
    <Navbar expand="lg" bg="dark" variant="dark" style={{height: '60px'}}>
      <Navbar.Brand href="#">
        <img alt="" src="book.png" width="20" height="20" />
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#">Create Book Manager</Nav.Link>
        <Nav.Link href="#">View Logs</Nav.Link>
      </Nav>
    </Navbar>
    {/* <Container>{props.children}</Container> */}
  </>
);

export default UserPageNavbar;
