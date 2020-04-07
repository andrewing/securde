import React from 'react';
import {Form, Input, Row, Col} from 'antd';

const Reset = () => {
  return (
    <Row type="flex" justify="center">
      <Form.Item name="newPassword">
        <Input.Password
          placeholder="Input New Password"
          autoComplete="off"
          style={{
            fontSize: 23,
            width: 280,
            height: 40,
            borderRadius: '5px',
            textAlign: 'center',
          }}
        />
      </Form.Item>
      <Form.Item name="confirmPassword">
        <Input.Password
          placeholder="Confirm Password"
          autoComplete="off"
          style={{
            fontSize: 23,
            width: 280,
            height: 40,
            borderRadius: '5px',
            textAlign: 'center',
          }}
        />
      </Form.Item>
    </Row>
  );
};

export default Reset;
