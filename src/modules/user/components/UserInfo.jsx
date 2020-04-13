import React, {useEffect, useState} from 'react';
import {Descriptions, Divider} from 'antd';
import {KeyOutlined} from '@ant-design/icons';
import {Container, Button, Jumbotron} from 'react-bootstrap';
import {getUserDetails, getQuestion, getId} from '../../../api/user/index';

const UserInfo = ({showChangePassword}) => {
  const [details, setDetails] = useState({});
  const [userId, setUserId] = useState('');
  const [question, setQuestion] = useState('');

  useEffect(() => {
    getUserDetails().then(res => {
      const {data} = res;
      setDetails(data.account);
    });
  }, []);

  useEffect(() => {
    if (details.username)
      getId(details.username).then(res => {
        const {data} = res;
        setUserId(data.id);
      });
  }, [details]);

  useEffect(() => {
    if (userId)
      getQuestion(userId).then(res => {
        const {data} = res;
        setQuestion(data.question);
      });
  }, [userId]);

  return (
    <>
      <Jumbotron bsPrefix="page-header" fluid>
        <h1 style={{color: '#6C4CC5'}}>{details.username}</h1>
        <p>Welcome to your profile!</p>
      </Jumbotron>
      <br />
      <Container>
        <Descriptions bordered size="small" column={2}>
          <Descriptions.Item label="ID Number">
            {details.idNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Name">
            {details.firstname} {details.lastname}
          </Descriptions.Item>
          <Descriptions.Item label="Username">
            {details.username}
          </Descriptions.Item>
          <Descriptions.Item label="Email Address">
            {details.email}
          </Descriptions.Item>
          <Descriptions.Item label="Security Question">
            {question}
          </Descriptions.Item>
          <Descriptions.Item>
            <Button
              variant="link"
              style={{
                color: '#6c63ff',
                fontSize: 13,
                padding: 0,
              }}
              onClick={() => showChangePassword()}
            >
              <KeyOutlined /> Change password
            </Button>
          </Descriptions.Item>
        </Descriptions>
        <Divider />
      </Container>
    </>
  );
};

export default UserInfo;
