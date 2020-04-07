/* eslint-disable react/no-array-index-key */
import React, {useState, useRef, useEffect} from 'react';
import {Form, Input, Modal, Row, Select, Divider, Steps} from 'antd';
import {
  UserOutlined,
  SolutionOutlined,
  LockOutlined,
  LoadingOutlined,
  CheckCircleTwoTone,
  CheckCircleOutlined,
} from '@ant-design/icons';
import {Button, ProgressBar} from 'react-bootstrap';
import {getId, checkAnswer, forgotPassword} from '../../../../api/user';
import Username from './components/Username';
import Question from './components/Question';
import Reset from './components/Reset';
import Done from './components/Done';
import {debounce} from '../../../../util/debounce';

const {Step} = Steps;

const ForgotPassword = ({visible, setVisibleForgot, setNotification}) => {
  const [form] = Form.useForm();
  const {Option} = Select;

  const [isUsernameLoading, setUsernameLoading] = useState(false);
  const [isQuestionLoading, setQuestionLoading] = useState(false);
  const [isResetLoading, setResetLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [userId, setUserId] = useState(null);
  const [isCorrectAnswer, setCorrectAnswer] = useState(null);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    if (page === 2 && isCorrectAnswer)
      setTimeout(() => {
        setPage(page + 1);
      }, 500);
  }, [page, isCorrectAnswer]);

  const resetModal = () => {
    setUsernameLoading(false);
    setQuestionLoading(false);
    setResetLoading(false);
    setUserId(null);
    setCorrectAnswer(null);
    setAnswer(null);
    form.resetFields();
    setPage(1);
  };

  const resetPassword = () => {
    form.validateFields(['newPassword', 'confirmPassword']).then(values => {
      setResetLoading(true);
      const {newPassword} = values;
      forgotPassword({answer, newPassword, id: userId})
        .then(res => {
          const {isSuccess} = res;
          setNotification(res);
          setResetLoading(false);
          if (isSuccess) setPage(page + 1);
        })
        .catch(err => {
          setNotification(err);
          setResetLoading(false);
        });
    });
  };

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
            setAnswer={setAnswer}
          />
        );
      case 3:
        return (
          <Reset
            form={form}
            setPage={setPage}
            page={page}
            isResetLoading={isResetLoading}
            resetPassword={resetPassword}
          />
        );
      case 4:
        return <Done setVisibleForgot={setVisibleForgot} />;
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
      afterClose={() => {
        resetModal();
      }}
      onCancel={() => {
        setVisibleForgot(false);
      }}
    >
      <Steps size="small" current={page}>
        <Step
          status={step(1)}
          title="Login"
          icon={
            isUsernameLoading ? (
              <LoadingOutlined />
            ) : (
              <UserOutlined style={{color: page >= 1 && '#6c63ff'}} />
            )
          }
        />
        <Step
          status={step(2)}
          title="Verification"
          icon={
            isQuestionLoading ? (
              <LoadingOutlined />
            ) : (
              <SolutionOutlined style={{color: page >= 2 && '#6c63ff'}} />
            )
          }
        />
        <Step
          status={step(3)}
          title="Reset Password"
          icon={
            isResetLoading ? (
              <LoadingOutlined />
            ) : (
              <LockOutlined style={{color: page >= 3 && '#6c63ff'}} />
            )
          }
        />
        <Step
          status={step(4)}
          title="Done"
          icon={
            page === 4 ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            ) : (
              <CheckCircleOutlined />
            )
          }
        />
      </Steps>
      <Form form={form}>{pages(page)}</Form>
    </Modal>
  );
};

export default ForgotPassword;
