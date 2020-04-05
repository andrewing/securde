import React, {useState} from 'react';
import {notification} from 'antd';
import {CheckCircleTwoTone} from '@ant-design/icons';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import './index.css';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import {AUDIENCE} from '../../util/constants';

const Page = () => {
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

  const loginAccount = values => {};

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
