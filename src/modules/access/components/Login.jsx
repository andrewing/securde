import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {Form, Input} from 'antd';

const UserLogin = ({
  selectedAccess,
  onClickShowSignUp,
  onClickShowForgot,
  loginAccount,
}) => {
  const [form] = Form.useForm();
  const [path, setPath] = useState('');

  useEffect(() => loginPath());

  const onClickLogin = () => {
    form
      .validateFields()
      .then(values => {
        loginAccount(values);
        form.resetFields();
      })
      .catch(info => {
        // console.log('Validate Failed:', info);
      });
  };

  const loginPath = () => {
    if (selectedAccess === 'Admin') {
      setPath('/admin/book-managers');
    } else if (selectedAccess === 'Manager') {
      setPath('/manager/manage-books');
    } else {
      setPath('/user/books');
    }
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
        <h1>Login as {selectedAccess}</h1>
        <Form form={form}>
          <span>Username</span>
          <Form.Item style={{margin: 0}} name="username">
            <Input
              style={{fontSize: 13, borderRadius: '5px'}}
              autoComplete="off"
              placeholder="Your Username"
            />
          </Form.Item>

          <br />

          <span>Password</span>
          <Form.Item style={{margin: 0}} name="password">
            <Input.Password
              style={{fontSize: 13, borderRadius: '5px'}}
              autoComplete="off"
              type="password"
              placeholder="Your Password"
            />
          </Form.Item>

          {selectedAccess !== 'Manager' && (
            <Button
              style={{color: '#6C63FF'}}
              variant="link"
              onClick={onClickShowForgot}
            >
              Forgot Password?
            </Button>
          )}

          <div style={{display: 'flex', paddingTop: 20}}>
            <Link to={path}>
              <Button
                bsPrefix="primary-button"
                type="submit"
                onClick={onClickLogin}
              >
                Log In
              </Button>
            </Link>

            {selectedAccess !== 'Manager' && (
              <Button
                style={{color: '#6C63FF'}}
                variant="link"
                onClick={onClickShowSignUp}
              >
                Sign Up
              </Button>
            )}
          </div>
          {selectedAccess === 'User' && (
            <Link to={path}>
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

      {selectedAccess === 'User' && (
        <img alt="user" src="./landing_page.png" className="image-placement" />
      )}

      {selectedAccess === 'Admin' && (
        <img alt="admin" src="./admin.png" className="image-placement" />
      )}

      {selectedAccess === 'Manager' && (
        <img alt="manager" src="./manager.png" className="image-placement" />
      )}
    </div>
  );
};

export default UserLogin;
