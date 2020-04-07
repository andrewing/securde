import React, {useState} from 'react';
import {Form, Input, Row, Col, Skeleton} from 'antd';
import {Button} from 'react-bootstrap';
import {BarLoader} from 'react-spinners';
import {getQuestion, checkAnswer} from '../../../../../api/user';

const Question = ({
  checkQuestion,
  setNotification,
  userId,
  isCorrectAnswer,
  isQuestionLoading,
  setPage,
  page,
  setAnswer,
}) => {
  const [question, setQuestion] = useState(null);

  if (userId)
    getQuestion(userId)
      .then(res => {
        const {question: q} = res.data;
        setQuestion(q);
      })
      .catch(err => {
        setNotification({isSuccess: false, message: err.message});
        setQuestion(null);
      });

  const validateStatus = () => {
    if (isCorrectAnswer === null) return '';
    if (isQuestionLoading) return 'validating';
    if (isCorrectAnswer) return 'success';
    return 'error';
  };

  return !question ? (
    <Skeleton active />
  ) : (
    <>
      <Row type="flex" justify="center">
        <div
          style={{
            width: '90%',
            fontSize: '23px',
            margin: '25px',
            wordWrap: 'break-word',
            textAlign: 'center',
          }}
        >
          {question}
        </div>
      </Row>
      <Row type="flex" justify="center">
        <Form.Item
          name="answer"
          hasFeedback={true}
          validateStatus={validateStatus()}
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
            placeholder="Answer"
            onChange={e => {
              setAnswer(e.target.value);
              checkQuestion(userId, e.target.value);
            }}
          />
        </Form.Item>
        {/* <Button
          bsPrefix="primary-button"
          style={{margin: '0px 17px', height: 40, display: isCorrectAnswer? "inline":"none"}}
          type="submit"
          disabled={!isCorrectAnswer}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next <RightOutlined />
        </Button> */}
      </Row>
    </>
  );
};

export default Question;
