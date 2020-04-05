import React from 'react';
import {Descriptions, Divider} from 'antd';
import {Container} from 'react-bootstrap';

const UserInfo = () => {
  return (
    <Container>
      <Descriptions bordered size="small" column={2}>
        <Descriptions.Item label="ID Number">hi</Descriptions.Item>
        <Descriptions.Item label="Name">hi</Descriptions.Item>
        <Descriptions.Item label="Username">hi</Descriptions.Item>
        <Descriptions.Item label="Email Address">hi</Descriptions.Item>
        <Descriptions.Item label="Security Question">hi</Descriptions.Item>
      </Descriptions>
      <Divider />
    </Container>
  );
};

export default UserInfo;
