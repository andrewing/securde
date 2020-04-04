import React from 'react';
import {Switch, Route} from 'react-router-dom';
import routes from './routes/routes';
import {request} from './api/api';
import Login from './modules/access';
import PageNotFound from './common/main-pages/PageNotFound';
import PrivateRoute from './common/PrivateRoute';
import Admin from './modules/admin/Page';
import './index.css';
import './App.css';

const App = () => {
  // const mainPages = routes.map(route => (
  //   <PrivateRoute
  //     key={route.key}
  //     exact={route.exact}
  //     path={route.path}
  //     component={route.component}
  //     {...routes}
  //   />
  // ));

  return (
    <>
      <Switch>
        <Route component={Login} path="/" exact />
        <Route component={PageNotFound} path="*" />
        <PrivateRoute path="/admin" component={Admin} />
        {/* {mainPages} */}
      </Switch>
    </>
  );
};

export default App;
