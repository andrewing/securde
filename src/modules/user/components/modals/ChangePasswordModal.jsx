import React from 'react';
import {Modal, Form, Input} from 'antd';
import {Button} from 'react-bootstrap';

const ChangePasswordModal = ({showModal, changePassword, handleClose}) => {
  const [form] = Form.useForm();

  const onSubmit = () => {
    form
      .validateFields()
      .then(values => {
        values = {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        };

        changePassword(values);
        form.resetFields();
        handleClose();
      })
      .catch(info => {
        // console.log('Validate Failed:', info);
      });
  };

  const matchPassword = (_, value) => {
    try {
      if (value && form.getFieldValue('password') !== value)
        throw new Error('Password do not match.');
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.resolve();
  };

  return (
    <Modal
      title="Change Password"
      width={400}
      visible={showModal}
      centered={true}
      footer={null}
      onCancel={() => {
        form.resetFields();
        handleClose();
      }}
    >
      <Form form={form}>
        <Form.Item
          name="oldPassword"
          rules={[
            {required: true, message: 'Please input your new password'},
            {
              min: 8,
              message: 'It should be at least 8 characters',
            },
          ]}
        >
          <Input.Password
            style={{
              fontSize: 13,
              padding: '3px 10px',
              borderRadius: '5px',
            }}
            autoComplete="off"
            type="password"
            placeholder="Input your old password"
            minLength={8}
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          rules={[
            {required: true, message: 'Please input your new password'},
            {
              min: 8,
              message: 'It should be at least 8 characters',
            },
          ]}
        >
          <Input.Password
            style={{
              fontSize: 13,
              padding: '3px 10px',
              borderRadius: '5px',
            }}
            autoComplete="off"
            type="password"
            placeholder="Input your new password"
            minLength={8}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          rules={[
            {required: true, message: 'Please confirm your new password'},
            {validator: matchPassword},
          ]}
        >
          <Input.Password
            style={{
              fontSize: 13,
              padding: '3px 10px',
              borderRadius: '5px',
            }}
            autoComplete="off"
            type="password"
            placeholder="Confirm Password"
            minLength={8}
          />
        </Form.Item>
      </Form>

      <div style={{textAlign: 'center', paddingTop: 20}}>
        <Button
          bsPrefix="primary-button"
          style={{margin: '0px 17px'}}
          onClick={onSubmit}
        >
          Confirm
        </Button>

        <Button
          bsPrefix="secondary-button"
          style={{margin: '0px 19px'}}
          onClick={() => {
            form.resetFields();
            handleClose();
          }}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
