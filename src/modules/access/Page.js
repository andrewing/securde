import React, {useState, useEffect} from 'react';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword/index';
import {AUDIENCE} from '../../util/constants';
import './index.css';

const Page = ({setNotification, ...props}) => {
  const [selectedAccess, setAccess] = useState(AUDIENCE.USER_STUDENT);
  const [visibleSignUp, setVisibleSignUp] = useState(false);
  const [visibleForgot, setVisibleForgot] = useState(false);

  const {history} = props;

  const onClickAccess = e => {
    setAccess(e);
  };

  return (
    <>
      <LandingPage onClickAccess={onClickAccess} />

      {!!selectedAccess && (
        <Login
          selectedAccess={selectedAccess}
          onClickShowSignUp={() => {
            setVisibleSignUp(true);
          }}
          onClickShowForgot={() => {
            setVisibleForgot(true);
          }}
          setNotification={setNotification}
          history={history}
        />
      )}

      <SignUp
        visible={visibleSignUp}
        setVisibleSignUp={setVisibleSignUp}
        setNotification={setNotification}
        selectedAccess={selectedAccess}
      />

      <ForgotPassword
        visible={visibleForgot}
        setVisibleForgot={setVisibleForgot}
        setNotification={setNotification}
      />
    </>
  );
};

export default Page;
