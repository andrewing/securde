import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {Form, Input} from 'antd';

const UserLogin = ({selectedAccess, onClickShowSignUp, onClickShowForgot}) => {
  const [form] = Form.useForm();
  const [path, setPath] = useState('');

  useEffect(() => loginPath());

  const onClickLogin = () => {
    form
      .validateFields()
      .then(values => {
        console.log(values);

        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
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
              style={{fontSize: 13}}
              autoComplete="off"
              placeholder="Your Username"
            />
          </Form.Item>

          <br />

          <span>Password</span>
          <Form.Item style={{margin: 0}} name="password">
            <Input
              style={{fontSize: 13}}
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
