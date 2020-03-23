import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  return (
    <>
      <Link to="/user">
        <button type="button">Log In as User</button>
      </Link>
      <Link to="/admin">
        <button type="button">Login as Admin</button>
      </Link>
      <Link to="/manager">
        <button type="button">Login as Book Manager</button>
      </Link>
    </>
  );
};

export default LoginPage;
