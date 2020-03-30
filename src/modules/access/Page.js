import React, {useState, Component} from 'react';
import {Container, Col} from 'react-bootstrap';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import './index.css';
import SignUp from './components/SignUp';

const Page = () => {
  const [selectedAccess, setAccess] = useState('User');
  const [showModal, setShowModal] = useState(false);

  const onClickAccess = e => {
    if (e.includes('User')) {
      setAccess('User');
    } else if (e.includes('Admin')) {
      setAccess('Admin');
    } else {
      setAccess('Manager');
    }
  };

  const onClickShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <LandingPage onClickAccess={onClickAccess} />

      {!!selectedAccess && (
        <Login selectedAccess={selectedAccess} onClickShow={onClickShow} />
      )}

      <SignUp showModal={showModal} handleClose={handleClose} />
    </>
  );
};

export default Page;
