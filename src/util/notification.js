import React from 'react';
import {notification} from 'antd';
import {CheckCircleTwoTone, CloseCircleTwoTone} from '@ant-design/icons';

export const notify = (isSuccess, message, description) => {
  const body = {
    icon: isSuccess ? (
      <CheckCircleTwoTone twoToneColor="#52C41A" />
    ) : (
      <CloseCircleTwoTone twoToneColor="#eb2f96" />
    ),
    message,
    description,
  };
  notification.open(body);
};
