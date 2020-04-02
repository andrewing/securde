/* eslint-disable react/no-array-index-key */
import React, {useState} from 'react';
import {Form, Input, Modal, Row, Select, Divider} from 'antd';
import {Button} from 'react-bootstrap';

const ForgotPassword = ({showModal, handleClose, resetPassword}) => {
  const [form] = Form.useForm();
  const {Option} = Select;

  const [disableReset, setDisableReset] = useState(false);

  const onSubmit = event => {
    form
      .validateFields()
      .then(values => {
        values = {
          username: values.username,
          password: values.password,
          question: values.question,
          answer: values.answer,
        };

        // verify security question (step 1) with username, then proceed to reset do it like this
        // if(gucci) setDisable(false);
        // only enable the reset password fields (step 2) if security question is verified

        resetPassword(values);
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

  const questions = [
    'In what city did you have your first ever birthday party?',
    'What is the last name of your Science class teacher in high school?',
    'Which company manufactured your first mobile phone?',
    'Who was your childhood hero?',
    'Where was your best family vacation?',
  ];

  return (
    <Modal
      title="Reset Password"
      visible={showModal}
      okText="Submit"
      centered={true}
      footer={null}
      width={650}
      onOk={onSubmit}
      onCancel={() => {
        form.resetFields();
        handleClose();
      }}
    >
      <Form form={form} initialValues={{question: questions[0]}}>
        <div style={{textAlign: 'center', padding: 10}}>
          <h4 style={{margin: 0}}>
            Step 1 : Answer the security question you chose during sign up.
          </h4>
        </div>
        <Row justify="center">
          <Form.Item
            style={{margin: '5px 10px'}}
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
                fontSize: 13,
                padding: '3px 10px',
                width: 280,
                borderRadius: '5px',
              }}
              autoComplete="off"
              placeholder="Input your username first"
            />
          </Form.Item>
        </Row>
        <Row type="flex">
          <Form.Item
            style={{margin: '5px 10px'}}
            name="question"
            rules={[
              {
                required: true,
                message: 'Please choose a security question',
              },
            ]}
          >
            <Select
              placholder="Choose a security question"
              style={{fontSize: 12, width: 280}}
            >
              {questions.map((item, i) => (
                <Option
                  style={{fontSize: 11}}
                  key={i}
                  title={item}
                  value={item}
                >
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{margin: '5px 10px'}}
            name="answer"
            rules={[
              {
                required: true,
                message: 'This field is required.',
              },
            ]}
          >
            <Input
              style={{
                fontSize: 13,
                padding: '3px 10px',
                width: 280,
                borderRadius: '5px',
              }}
              autoComplete="off"
              placeholder="Answer"
            />
          </Form.Item>
        </Row>

        <Divider />

        <div style={{textAlign: 'center', padding: '10px'}}>
          <h4 style={{margin: 0}}>Step 2 : Reset Your Password</h4>
        </div>
        <Row type="flex">
          <Form.Item
            style={{margin: '5px 10px'}}
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password',
              },
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
                width: 280,
                borderRadius: '5px',
              }}
              autoComplete="off"
              type="password"
              placeholder="New Password"
              minLength={8}
              disabled={disableReset}
            />
          </Form.Item>

          <Form.Item
            style={{margin: '5px 10px'}}
            name="confirm"
            rules={[
              {
                required: true,
                message: 'Please confirm your password',
              },
              {validator: matchPassword},
            ]}
          >
            <Input.Password
              style={{
                fontSize: 13,
                padding: '3px 10px',
                width: 280,
                borderRadius: '5px',
              }}
              autoComplete="off"
              type="password"
              placeholder="Confirm Password"
              disabled={disableReset}
            />
          </Form.Item>
        </Row>
      </Form>

      <div style={{textAlign: 'center', paddingTop: 20}}>
        <Button
          bsPrefix="primary-button"
          style={{margin: '0px 17px'}}
          onClick={onSubmit}
          disabled={disableReset}
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

export default ForgotPassword;
