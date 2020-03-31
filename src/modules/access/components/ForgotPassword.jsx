/* eslint-disable react/no-array-index-key */
import React, {useState} from 'react';
import {Form, Input, Modal, Row, Select, Divider} from 'antd';
import {Button} from 'react-bootstrap';

const ForgotPassword = ({showModal, handleClose, form}) => {
  const {getFieldDecorator} = form;
  const {Option} = Select;

  const [disableReset, setDisableReset] = useState(false);

  const onSubmit = event => {
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      values = {
        password: values.password,
        question: values.question,
        answer: values.answer,
      };

      form.resetFields();
      handleClose();
    });
  };

  const matchPassword = (rule, value, callback) => {
    if (value.length && form.getFieldValue('password') !== value) {
      callback('Password do not match.');
    } else callback();
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
      <Form size="small">
        <div style={{textAlign: 'center', padding: 10}}>
          <h4 style={{margin: 0}}>
            Step 1 : Answer the security question you chose during sign up.
          </h4>
        </div>
        <Row type="flex">
          <Form.Item style={{margin: '5px 10px'}}>
            {getFieldDecorator('question', {
              initialValue: questions[0],
              rules: [
                {
                  required: true,
                  message: 'Please choose a security question',
                },
              ],
            })(
              <Select
                placholder="Choose a security question"
                style={{fontSize: 11, width: 280}}
              >
                {questions.map((item, i) => (
                  <Option
                    style={{fontSize: 10}}
                    key={i}
                    title={item}
                    value={item}
                  >
                    {item}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>

          <Form.Item style={{margin: '5px 10px'}}>
            {getFieldDecorator('answer', {
              rules: [
                {
                  required: true,
                  message: 'This field is required.',
                },
              ],
            })(
              <Input
                style={{fontSize: 11, padding: '3px 10px', width: 280}}
                autoComplete="off"
                placeholder="Answer"
              />,
            )}
          </Form.Item>
        </Row>

        <Divider />

        <div style={{textAlign: 'center', padding: '10px'}}>
          <h4 style={{margin: 0}}>Step 2 : Reset Your Password</h4>
        </div>
        <Row type="flex">
          <Form.Item style={{margin: '5px 10px'}}>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password',
                },
                {
                  min: 8,
                  message: 'It should be at least 8 characters',
                },
              ],
            })(
              <Input
                style={{fontSize: 11, padding: '3px 10px', width: 280}}
                autoComplete="off"
                type="password"
                placeholder="New Password"
                minLength={8}
                disabled={disableReset}
              />,
            )}
          </Form.Item>

          <Form.Item style={{margin: '5px 10px'}}>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password',
                },
                {validator: matchPassword},
              ],
            })(
              <Input
                style={{fontSize: 11, padding: '3px 10px', width: 280}}
                autoComplete="off"
                type="password"
                placeholder="Confirm Password"
                disabled={disableReset}
              />,
            )}
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

export default Form.create()(ForgotPassword);
