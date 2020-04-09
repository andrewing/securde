import React from 'react';
import {useDispatch} from 'react-redux';
import Page from './Page';
import {actions} from '../../redux/notification';

const User = props => {
  const dispatch = useDispatch();

  const setNotification = obj => {
    let {isSuccess, message} = obj;
    if (obj instanceof Error) {
      isSuccess = false;
      message = obj.message;
    }
    dispatch(actions.setNotification({isSuccess, message}));
  };

  return <Page setNotification={setNotification} {...props} />;
};

export default User;
