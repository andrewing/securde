import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {BeatLoader} from 'react-spinners';
import {Form, Input} from 'antd';
import {AUDIENCE} from '../../../util/constants';
import {login} from '../../../api/auth/index';
import {auth} from '../../../api/auth';

const UserLogin = ({
  selectedAccess,
  onClickShowSignUp,
  onClickShowForgot,
  setNotification,
  history,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);

  const loginAccount = values => {
    values = {
      ...values,
      type: selectedAccess,
    };

    login(values)
      .then(res => {
        const {data} = res;
        setNotification(res);
        setLoading(false);
        const {access, refresh, type} = data;
        auth.authenticate(access, refresh, type);
        switch (data.type) {
          case AUDIENCE.USER_STUDENT:
          case AUDIENCE.USER_TEACHER:
            return history.push('/user');
          case AUDIENCE.BOOK_MANAGER:
            return history.push('/manager');
          case AUDIENCE.ADMIN:
            return history.push('/admin/book-managers');
          default:
            return history.push('/');
        }
      })
      .catch(err => {
        setNotification({isSuccess: false, message: err.message});
        setLoading(false);
      });
    return history.push('/');
  };

  const onClickLogin = () => {
    form.validateFields().then(values => {
      setLoading(true);
      loginAccount(values);
    });
  };

  const renderDisplay = access => {
    if (selectedAccess === AUDIENCE.ADMIN) {
      return 'Admin';
    }
    if (selectedAccess === AUDIENCE.BOOK_MANAGER) {
      return 'Book Manager';
    }
    return 'User';
  };

  return (
    <div className="custom-col">
      <div
        style={{
          paddingTop: 10,
          marginLeft: 190,
          width: 350,
        }}
      >
        <h1>Login as {renderDisplay(selectedAccess)}</h1>
        <Form form={form}>
          <span>Username</span>
          <Form.Item
            style={{margin: 0}}
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username',
              },
            ]}
          >
            <Input
              style={{fontSize: 13, borderRadius: '5px'}}
              autoComplete="off"
              placeholder="Your Username"
            />
          </Form.Item>

          <br />

          <span>Password</span>
          <Form.Item
            style={{margin: 0}}
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password',
              },
            ]}
          >
            <Input.Password
              style={{fontSize: 13, borderRadius: '5px'}}
              autoComplete="off"
              type="password"
              placeholder="Your Password"
            />
          </Form.Item>

          {selectedAccess !== AUDIENCE.BOOK_MANAGER && (
            <Button
              style={{color: '#6C63FF'}}
              variant="link"
              onClick={onClickShowForgot}
            >
              Forgot Password?
            </Button>
          )}

          <div style={{display: 'flex', paddingTop: 20}}>
            <Button
              bsPrefix="primary-button"
              type="submit"
              onClick={onClickLogin}
              disabled={isLoading}
            >
              {isLoading ? <BeatLoader size={8} color="white" /> : 'Log In'}
            </Button>

            {selectedAccess === AUDIENCE.USER_STUDENT && (
              <Button
                style={{color: '#6C63FF'}}
                variant="link"
                onClick={onClickShowSignUp}
              >
                Sign Up
              </Button>
            )}
          </div>
          {selectedAccess === AUDIENCE.USER_STUDENT && (
            <Link to="/guest/books">
              <Button
                style={{
                  color: '#6C63FF',
                  padding: '15px 0px',
                  fontSize: 13,
                }}
                variant="link"
                type="submit"
              >
                Log In as a Guest 🡢
              </Button>
            </Link>
          )}
        </Form>
      </div>

      {selectedAccess === AUDIENCE.USER_STUDENT && (
        <img alt="user" src="./landing_page.png" className="image-placement" />
      )}

      {selectedAccess === AUDIENCE.ADMIN && (
        <img alt="admin" src="./admin.png" className="image-placement" />
      )}

      {selectedAccess === AUDIENCE.BOOK_MANAGER && (
        <img alt="manager" src="./manager.png" className="image-placement" />
      )}
    </div>
  );
};

export default UserLogin;
