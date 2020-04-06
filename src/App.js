import React from 'react';
import {useSelector} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import routes from './routes/routes';
import {request} from './api/api';
import Login from './modules/access';
import PageNotFound from './common/main-pages/PageNotFound';
import PrivateRoute from './common/PrivateRoute';
import GuestPage from './modules/guest';
import './index.css';
import './App.css';

const App = () => {
  const notif = useSelector(state => state.notification);

  const mainPages = routes.map(route => (
    <PrivateRoute
      key={route.key}
      exact={route.exact}
      path={route.path}
      component={route.component}
      type={route.type}
      {...routes}
    />
  ));

  return (
    <>
      <Switch>
        <Route component={Login} path="/" exact />
        {mainPages}
        <Route component={GuestPage} path="/guest" />
        <Route component={PageNotFound} path="*" />
      </Switch>
    </>
  );
};

export default App;
