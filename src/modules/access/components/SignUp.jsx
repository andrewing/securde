/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Form, Input, Modal, Row, Select, notification, Icon} from 'antd';
import {Button} from 'react-bootstrap';

const SignUpForm = ({showModal, handleClose}) => {
  const [form] = Form.useForm();
  const {Option} = Select;

  const onSubmit = event => {
    form
      .validateFields()
      .then(values => {
        values = {
          username: values.username,
          password: values.password,
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          idnumber: values.id_number,
          question: values.security_question,
          answer: values.answer,
          bookHistory: [],
        };
        notification.open({
          // icon: (
          //   <Icon type="check-circle" theme="twoTone" twoToneColor="#52C41A" />
          // ),
          message: 'Successfully Signed Up!',
          description: 'You can now log int with your new account.',
        });
        console.log(values);

        form.resetFields();
        handleClose();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const matchPassword = (_, value) => {
    if (!value && form.getFieldValue('password') !== value) {
      return Promise.reject('Password do not match.');
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
      title="Sign Up!"
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
      <Form form={form} initialValues={{security_question: questions[0]}}>
        <div style={{display: 'flex', alignItems: 'stretch'}}>
          <Form.Item
            name="id_number"
            style={{margin: '5px 10px'}}
            rules={[
              {
                required: true,
                message: 'Please input valid ID number',
              },
            ]}
          >
            <Input
              type="number"
              min="0"
              max="9"
              style={{fontSize: 13, padding: '3px 10px', width: 180}}
              autoComplete="off"
              placeholder="ID Number"
            />
          </Form.Item>

          <Form.Item
            style={{margin: '5px 10px'}}
            name="firstname"
            rules={[
              {
                required: true,
                message: 'Please input your first name',
              },
            ]}
          >
            <Input
              style={{fontSize: 13, padding: '3px 10px', width: 180}}
              autoComplete="off"
              placeholder="First Name"
            />
          </Form.Item>

          <Form.Item
            style={{margin: '5px 10px'}}
            name="lastname"
            rules={[
              {
                required: true,
                message: 'Please input your last name',
              },
            ]}
          >
            <Input
              style={{fontSize: 13, padding: '3px 10px', width: 180}}
              autoComplete="off"
              placeholder="Last Name"
            />
          </Form.Item>
        </div>

        <Row type="flex">
          <Form.Item
            style={{margin: '5px 10px'}}
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email',
              },
              {
                type: 'email',
                message: 'Please input valid email',
              },
            ]}
          >
            <Input
              style={{fontSize: 13, padding: '3px 10px', width: 280}}
              autoComplete="off"
              placeholder="Email"
            />
          </Form.Item>

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
              style={{fontSize: 13, padding: '3px 10px', width: 280}}
              autoComplete="off"
              placeholder="Username"
            />
          </Form.Item>
        </Row>

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
            <Input
              style={{fontSize: 13, padding: '3px 10px', width: 280}}
              autoComplete="off"
              type="password"
              placeholder="Password"
              minLength={8}
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
            <Input
              style={{fontSize: 13, padding: '3px 10px', width: 280}}
              autoComplete="off"
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
        </Row>

        <Row type="flex">
          <Form.Item
            style={{margin: '5px 10px'}}
            name="security_question"
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
              style={{fontSize: 13, padding: '3px 10px', width: 280}}
              autoComplete="off"
              placeholder="Answer"
            />
          </Form.Item>
        </Row>
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

export default SignUpForm;
