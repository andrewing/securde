import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {notify} from '../../util/notification';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import {auth} from '../../api/auth';
import {login, register} from '../../api/auth/index';
import './index.css';
import {AUDIENCE} from '../../util/constants';
import {actions} from '../../redux/notification';

const Page = ({setNotification, ...props}) => {
  const [selectedAccess, setAccess] = useState(AUDIENCE.USER_STUDENT);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onClickAccess = e => {
    setAccess(e);
  };

  const handleClose = () => {
    setShowSignUp(false);
    setShowForgotPassword(false);
  };

  const loginAccount = values => {
    values = {
      ...values,
      type: selectedAccess,
    };

    login(values)
      .then(res => {
        const {data} = res;
        setNotification(res);
        setLoading(false);
        const {access, refresh, type} = data;
        auth.authenticate(access, refresh, type);
        switch (data.type) {
          case AUDIENCE.USER_STUDENT:
          case AUDIENCE.USER_TEACHER:
            return props.history.push('/user');
          case AUDIENCE.BOOK_MANAGER:
            return props.history.push('/manager');
          case AUDIENCE.ADMIN:
            return props.history.push('/admin/book-managers');
          default:
            return props.history.push('/');
        }
      })
      .catch(err => {
        setNotification({isSuccess: false, message: err.message});
        setLoading(false);
      });
    return props.history.push('/');
  };

  const signupAccount = values => {
    values = {
      ...values,
      type: selectedAccess,
      bookHistory: [],
    };

    register(values)
      .then(res => {
        const {data} = res;
        setNotification(res);
        setLoading(false);
      })
      .catch(err => {
        setNotification({isSuccess: false, message: err.message});
        setLoading(false);
      });
  };

  const resetPassword = values => {};

  return (
    <>
      <LandingPage onClickAccess={onClickAccess} />

      {!!selectedAccess && (
        <Login
          selectedAccess={selectedAccess}
          onClickShowSignUp={() => {
            setShowSignUp(true);
          }}
          onClickShowForgot={() => {
            setShowForgotPassword(true);
          }}
          loginAccount={loginAccount}
          isLoading={isLoading}
          setLoading={setLoading}
        />
      )}

      <SignUp
        showModal={showSignUp}
        handleClose={handleClose}
        signupAccount={signupAccount}
      />
      <ForgotPassword
        showModal={showForgotPassword}
        handleClose={handleClose}
        resetPassword={resetPassword}
      />
    </>
  );
};

export default Page;
