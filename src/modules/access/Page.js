import React, {useState, Component} from 'react';
import {Container, Col} from 'react-bootstrap';
import LoginPage from './components/LandingPage';
import UserLogin from './components/Login';
import './index.css';

const Page = () => {
  const [selectedAccess, setAccess] = useState('User');

  const onClickAccess = e => {
    if (e.includes('User')) {
      setAccess('User');
    } else if (e.includes('Admin')) {
      setAccess('Admin');
    } else {
      setAccess('Manager');
    }
  };

  return (
    <>
      <LoginPage onClickAccess={onClickAccess} />

      {!!selectedAccess && <UserLogin selectedAccess={selectedAccess} />}
    </>
  );
};

export default Page;
