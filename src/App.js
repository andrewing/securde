import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {BeatLoader} from 'react-spinners';
import routes from './routes/routes';
import Login from './modules/access';
import PageNotFound from './common/main-pages/PageNotFound';
import PrivateRoute from './common/PrivateRoute';
import GuestPage from './modules/guest';
import './index.css';
import './App.css';
import {notify} from './util/notification';
import {dbStart} from './api/db-start';

const App = () => {
  const notif = useSelector(state => state.notification);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (notif.isSuccess !== null)
      notify(notif.isSuccess, notif.message, notif.description);
  }, [notif]);

  useEffect(() => {
    setLoading(true);
    dbStart()
      .then(res => {})
      .catch(err => {
        notify(false, err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

  return isLoading ? (
    <BeatLoader />
  ) : (
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
