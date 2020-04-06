import React, {useState} from 'react';
import {BeatLoader} from 'react-spinners';
import {Form, Input, Modal, Row, Select} from 'antd';
import {Button} from 'react-bootstrap';
import {register} from '../../../api/auth/';

const {Option} = Select;

const SignUpForm = ({visible, setVisibleSignUp, setNotification, selectedAccess}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const signupAccount = body => {
    register(body).then(res => {
      const {data} = res;
      setNotification(res);
      setVisibleSignUp(false);
      setConfirmLoading(false);
    });
  };

  const onSubmit = () => {
    form.validateFields().then(values => {
      setConfirmLoading(true);
      values = {
        ...values,
        type: selectedAccess,
        bookHistory: [],
      };
      signupAccount(values);
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
      title="Sign Up!"
      visible={visible}
      okText="Submit"
      centered={true}
      footer={null}
      width={650}
      onOk={onSubmit}
      onCancel={() => {
        form.resetFields();
        setVisibleSignUp(false);
      }}
    >
      <Form form={form} initialValues={{question: questions[0]}}>
        <div style={{display: 'flex', alignItems: 'stretch'}}>
          <Form.Item
            name="idNumber"
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
              style={{
                fontSize: 13,
                padding: '3px 10px',
                width: 180,
                borderRadius: '5px',
              }}
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
              style={{
                fontSize: 13,
                padding: '3px 10px',
                width: 180,
                borderRadius: '5px',
              }}
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
              style={{
                fontSize: 13,
                padding: '3px 10px',
                width: 180,
                borderRadius: '5px',
              }}
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
              style={{
                fontSize: 13,
                padding: '3px 10px',
                width: 280,
                borderRadius: '5px',
              }}
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
              style={{
                fontSize: 13,
                padding: '3px 10px',
                width: 280,
                borderRadius: '5px',
              }}
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
            <Input.Password
              style={{
                fontSize: 13,
                padding: '3px 10px',
                width: 280,
                borderRadius: '5px',
              }}
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
      </Form>

      <div style={{textAlign: 'center', paddingTop: 20}}>
        <Button
          bsPrefix="primary-button"
          style={{margin: '0px 17px'}}
          onClick={onSubmit}
        >
          {confirmLoading ? <BeatLoader size={8} color="white" /> : 'Confirm'}
        </Button>

        <Button
          bsPrefix="secondary-button"
          style={{margin: '0px 19px'}}
          onClick={() => {
            form.resetFields();
            setVisibleSignUp(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default SignUpForm;
