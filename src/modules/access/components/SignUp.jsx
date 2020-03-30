import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Modal} from 'antd';
import {Button} from 'react-bootstrap';

const SignUpForm = ({showModal, handleClose, form}) => {
  const {getFieldDecorator} = form;

  const onSubmit = event => {
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    // setValidated(true);
  };

  return (
    <Modal
      title="Sign Up"
      visible={showModal}
      onOk={onSubmit}
      onCancel={handleClose}
      okText="Submit"
      centered={true}
      footer={null}
      width={350}
    >
      <Form size="small">
        <Form.Item style={{fontSize: '8pt'}} name="id_number">
          {getFieldDecorator('id_number', {
            rules: [
              {
                required: true,
                message: 'Please input your ID number',
              },
            ],
          })(
            <Input
              style={{fontSize: 13, fontWeight: 5, padding: 3}}
              placeholder="ID Number"
            />,
          )}
        </Form.Item>

        <Form.Item
          name="firstname"
          rules={[{required: true, message: 'Please input your first name'}]}
        >
          <Input
            style={{fontSize: 13, fontWeight: 5, padding: 3}}
            placeholder="First Name"
          />
        </Form.Item>

        <Form.Item
          name="lastname"
          rules={[{required: true, message: 'Please input your last name'}]}
        >
          <Input
            style={{fontSize: 13, fontWeight: 5, padding: 3}}
            placeholder="Last Name"
          />
        </Form.Item>

        <Form.Item
          name="username"
          rules={[{required: true, message: 'Please input your username'}]}
        >
          <Input
            style={{fontSize: 13, fontWeight: 5, padding: 3}}
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{required: true, message: 'Please input your password'}]}
        >
          <Input
            style={{fontSize: 13, fontWeight: 5, padding: 3}}
            placeholder="Password"
            minLength={8}
          />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          rules={[
            {required: true, message: 'Please input confirm your password'},
          ]}
        >
          <Input
            style={{fontSize: 13, fontWeight: 5, padding: 3}}
            placeholder="Confirm Password"
          />
        </Form.Item>
      </Form>

      <div style={{textAlign: 'center'}}>
        <Button
          bsPrefix="primary-button"
          style={{margin: '0px 20px'}}
          onClick={onSubmit}
        >
          Confirm
        </Button>

        <Button
          bsPrefix="secondary-button"
          style={{margin: '0px 20px'}}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

SignUpForm.propTypes = {
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default Form.create()(SignUpForm);
