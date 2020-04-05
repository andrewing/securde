import React from 'react';
import {Descriptions, Divider} from 'antd';
import {KeyOutlined} from '@ant-design/icons';
import {Container, Button} from 'react-bootstrap';

const UserInfo = ({showChangePassword}) => {
  return (
    <Container>
      <Descriptions bordered size="small" column={2}>
        <Descriptions.Item label="ID Number">user id number</Descriptions.Item>
        <Descriptions.Item label="Name">
          user first and last name
        </Descriptions.Item>
        <Descriptions.Item label="Username">username</Descriptions.Item>
        <Descriptions.Item label="Email Address">user email</Descriptions.Item>
        <Descriptions.Item label="Security Question">
          user security question
        </Descriptions.Item>
        <Descriptions.Item>
          <Button
            variant="link"
            style={{
              color: '#6c63ff',
              fontSize: 13,
              padding: 0,
            }}
            onClick={() => showChangePassword()}
          >
            <KeyOutlined /> Change password
          </Button>
        </Descriptions.Item>
      </Descriptions>
      <Divider />
    </Container>
  );
};

export default UserInfo;
