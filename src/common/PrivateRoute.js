import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import loginAuth from './loginAuth';

const PrivateRoute = ({component: Component, path, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        loginAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
