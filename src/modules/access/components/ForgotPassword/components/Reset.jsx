import React from 'react';
import {Form, Input, Row, Col} from 'antd';
import {Button} from 'react-bootstrap';
import {BeatLoader} from 'react-spinners';

const Reset = ({form, setPage, page, isResetLoading, resetPassword}) => {
  const matchPassword = (_, value) => {
    try {
      if (value && form.getFieldValue('newPassword') !== value)
        throw new Error('Password do not match.');
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.resolve();
  };

  return (
    <>
      <Row type="flex" justify="center">
        <Form.Item
          name="newPassword"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
          style={{margin: '20px 10px 20px'}}
        >
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
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
            {validator: matchPassword},
          ]}
          style={{margin: '10px 20px 20px'}}
        >
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
      <Row type="flex" justify="center">
        <Button
          bsPrefix="primary-button"
          style={{
            width: 280,
            height: 40,
            marginTop: '10px',
          }}
          type="submit"
          onClick={() => {
            resetPassword();
          }}
        >
          {isResetLoading ? <BeatLoader size={8} color="white" /> : 'Submit'}
        </Button>
      </Row>
    </>
  );
};

export default Reset;
