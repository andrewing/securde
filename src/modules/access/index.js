import React from 'react';
import {useDispatch} from 'react-redux';
import Page from './Page';
import {actions} from '../../redux/notification';

const Access = props => {
  const dispatch = useDispatch();

  const setNotification = ({isSuccess, message}) => {
    dispatch(actions.setNotification({isSuccess, message}));
  };

  return <Page setNotification={setNotification} {...props} />;
};

export default Access;
