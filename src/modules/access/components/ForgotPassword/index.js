/* eslint-disable react/no-array-index-key */
import React, {useState, useRef} from 'react';
import {Form, Input, Modal, Row, Select, Divider, Steps} from 'antd';
import {
  UserOutlined,
  SolutionOutlined,
  LockOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import {Button, ProgressBar} from 'react-bootstrap';
import {getId, checkAnswer} from '../../../../api/user';
import Username from './components/Username';
import Question from './components/Question';
import Reset from './components/Reset';
import {debounce} from '../../../../util/debounce';

const {Step} = Steps;

const ForgotPassword = ({visible, setVisibleForgot, setNotification}) => {
  const [form] = Form.useForm();
  const {Option} = Select;

  const [isUsernameLoading, setUsernameLoading] = useState(false);
  const [isQuestionLoading, setQuestionLoading] = useState(false);
  const [isResetLoading, setResetLoading] = useState(false);
  const [disableReset, setDisableReset] = useState(false);
  const [page, setPage] = useState(1);

  const [userId, setUserId] = useState(null);
  const [isCorrectAnswer, setCorrectAnswer] = useState(null);

  const checkQuestion = useRef(
    debounce((id, answerCurr) => {
      setQuestionLoading(true);
      checkAnswer({id, answer: answerCurr})
        .then(res => {
          const {isCorrect: correct} = res.data;
          setCorrectAnswer(correct);
          setQuestionLoading(false);
        })
        .catch(err => {
          setNotification({isSuccess: false, message: err.message});
          setCorrectAnswer(false);
          setQuestionLoading(false);
        });
    }, 500),
  ).current;

  const checkUsername = e => {
    e.preventDefault();
    form.validateFields(['username']).then(values => {
      setUsernameLoading(true);
      const {username} = values;
      getId(username)
        .then(res => {
          const {data, isSuccess} = res;
          const {id} = data;
          setUsernameLoading(false);
          if (isSuccess) {
            setUserId(id);
            setPage(page + 1);
          } else {
            setNotification(res);
          }
        })
        .catch(err => {
          setNotification({isSuccess: false, message: err.message});
          setUsernameLoading(false);
        });
    });
  };

  const onSubmit = event => {
    form.validateFields().then(values => {
      values = {
        username: values.username,
        password: values.password,
        question: values.question,
        answer: values.answer,
      };

      form.resetFields();
      setPage(1);
      setVisibleForgot(false);
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

  const step = currStep => {
    if (currStep < page) return 'finish';
    if (currStep === page) return 'process';
    return 'wait';
  };

  const pages = num => {
    switch (num) {
      case 1:
        return (
          <Username
            checkUsername={checkUsername}
            form={form}
            setVisibleForgot={setVisibleForgot}
          />
        );
      case 2:
        return (
          <Question
            checkQuestion={checkQuestion}
            form={form}
            setVisibleForgot={setVisibleForgot}
            setNotification={setNotification}
            userId={userId}
            isCorrectAnswer={isCorrectAnswer}
            isQuestionLoading={isQuestionLoading}
            setPage={setPage}
            page={page}
          />
        );
      case 3:
        return <Reset />;
      default:
        return '';
    }
  };

  return (
    <Modal
      closable={false}
      visible={visible}
      okText="Submit"
      centered={true}
      footer={null}
      width={650}
      onOk={onSubmit}
      onCancel={() => {
        form.resetFields();
        setPage(1);
        setVisibleForgot(false);
      }}
    >
      <Steps size="small" current={page}>
        <Step
          status={step(1)}
          title="Login"
          icon={isUsernameLoading ? <LoadingOutlined /> : <UserOutlined />}
        />
        <Step
          status={step(2)}
          title="Verification"
          icon={isQuestionLoading ? <LoadingOutlined /> : <SolutionOutlined />}
        />
        <Step
          status={step(3)}
          title="Done"
          icon={isResetLoading ? <LoadingOutlined /> : <LockOutlined />}
        />
      </Steps>
      <Form form={form}>
        {pages(page)}
        {/* <Row type="flex">
          <Form.Item
            style={{ margin: '5px 10px' }}
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
              style={{ fontSize: 12, width: 280 }}
            >
              {questions.map((item, i) => (
                <Option
                  style={{ fontSize: 11 }}
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
            style={{ margin: '5px 10px' }}
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

        <div style={{ textAlign: 'center', padding: '10px' }}>
          <h4 style={{ margin: 0 }}>Step 2 : Reset Your Password</h4>
        </div>
        <Row type="flex">
          <Form.Item
            style={{ margin: '5px 10px' }}
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
            style={{ margin: '5px 10px' }}
            name="confirm"
            rules={[
              {
                required: true,
                message: 'Please confirm your password',
              },
              { validator: matchPassword },
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
        </Row> */}
      </Form>

      {/* <div style={{ textAlign: 'center', paddingTop: 20 }}>


        <Button
          bsPrefix="secondary-button"
          style={{ margin: '0px 19px' }}
          onClick={() => {
            form.resetFields();
            setVisibleForgot(false);
          }}
        >
          Cancel
        </Button>
        <Button
          bsPrefix="primary-button"
          style={{ margin: '0px 17px' }}
          onClick={onSubmit}
          disabled={disableReset}
        >
          Confirm
        </Button>
      </div> */}
    </Modal>
  );
};

export default ForgotPassword;
