import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {notify} from '../../util/notification';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import './index.css';
import {AUDIENCE} from '../../util/constants';
import {actions} from '../../redux/notification';

const Page = ({setNotification, ...props}) => {
  const [selectedAccess, setAccess] = useState(AUDIENCE.USER_STUDENT);
  const [visibleSignUp, setVisibleSignUp] = useState(false);
  const [visibleForgot, setVisibleForgot] = useState(false);

  const {history} = props;

  const onClickAccess = e => {
    setAccess(e);
  };

  const resetPassword = values => {};

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
      />
      <ForgotPassword
        visible={visibleForgot}
        setVisibleForgot={setVisibleForgot}
        resetPassword={resetPassword}
      />
    </>
  );
};

export default Page;
