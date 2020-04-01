import React, {useState} from 'react';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import './index.css';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';

const Page = () => {
  const [selectedAccess, setAccess] = useState('User');
  const [showSignUp, setShowSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const onClickAccess = e => {
    if (e.includes('User')) {
      setAccess('User');
    } else if (e.includes('Admin')) {
      setAccess('Admin');
    } else {
      setAccess('Manager');
    }
  };

  const onClickShowSignUp = () => {
    setShowSignUp(true);
  };

  const onClickShowForgot = () => {
    setShowForgotPassword(true);
  };

  const handleClose = () => {
    setShowSignUp(false);
    setShowForgotPassword(false);
  };

  return (
    <>
      <LandingPage onClickAccess={onClickAccess} />

      {!!selectedAccess && (
        <Login
          selectedAccess={selectedAccess}
          onClickShowSignUp={onClickShowSignUp}
          onClickShowForgot={onClickShowForgot}
        />
      )}

      <SignUp showModal={showSignUp} handleClose={handleClose} />
      <ForgotPassword
        showModal={showForgotPassword}
        handleClose={handleClose}
      />
    </>
  );
};

export default Page;
