import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {auth} from '../api/auth';

const PrivateRoute = ({component: Component, path, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
