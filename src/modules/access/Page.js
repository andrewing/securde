/* eslint-disable no-else-return */
import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {notification} from 'antd';
import {CheckCircleTwoTone} from '@ant-design/icons';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import {auth} from '../../api/auth';
import {login} from '../../api/auth/index';
import './index.css';
import {AUDIENCE} from '../../util/constants';

const Page = props => {
  const [selectedAccess, setAccess] = useState(AUDIENCE.USER_STUDENT);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

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
        return res.json();
      })
      .then(json => {
        const {data, isSuccessful, message} = json;
        const {access, refresh, type} = data;
        auth.authenticate(access, refresh, type);
        switch (data.type) {
          case AUDIENCE.USER_STUDENT:
          case AUDIENCE.USER_TEACHER:
            return props.history.push('/user');
          case AUDIENCE.BOOK_MANAGER:
            return props.history.push('/manager');
          case AUDIENCE.ADMIN:
            return props.history.push('/admin');
          default:
            return props.history.push('/');
        }
      });
    return props.history.push('/');
  };

  const signupAccount = values => {
    notification.open({
      icon: <CheckCircleTwoTone twoToneColor="#52C41A" />,
      message: 'Successfully Signed Up!',
      description: 'You can now log in with your new account.',
    });
    // console.log(values);
  };

  const resetPassword = values => {
    notification.open({
      icon: <CheckCircleTwoTone twoToneColor="#52C41A" />,
      message: 'Reset password successful!',
      description: 'You can now log in with your new password.',
    });
    // console.log(values);
  };

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
