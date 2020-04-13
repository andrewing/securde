import React, {useEffect} from 'react';
import {Form, Input, Row, Col} from 'antd';
import {Button} from 'react-bootstrap';
import {RightOutlined} from '@ant-design/icons';

const Username = ({checkUsername, form, setVisibleForgot}) => {
  let usernameInput = null;

  useEffect(() => {
    usernameInput.focus();
  });

  return (
    <>
      <Row type="flex" justify="center" align="middle">
        <Col span={13}>
          <Form.Item
            style={{margin: '30px'}}
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username',
              },
            ]}
          >
            <Input
              style={{
                fontSize: 23,
                width: 280,
                height: 40,
                borderRadius: '5px',
                textAlign: 'center',
              }}
              autoComplete="off"
              placeholder="Input Username"
              ref={input => {
                usernameInput = input;
              }}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Button
            bsPrefix="primary-button"
            style={{margin: '0px 17px', height: 40}}
            onClick={checkUsername}
            type="submit"
          >
            Next <RightOutlined />
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Username;
