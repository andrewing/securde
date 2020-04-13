import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input} from 'antd';

const InputField = prop => {
  if (prop.name === 'password') {
    return (
      <Form.Item
        name={prop.name}
        rules={[
          {
            required: true,
            message: prop.message,
          },
          {
            min: 8,
            message: prop.message,
          },
        ]}
      >
        <Input.Password
          placeholder={prop.placeholder}
          autoComplete="off"
          type="password"
          className="field"
          minLength={8}
        />
      </Form.Item>
    );
  }
  if (prop.name === 'email') {
    return (
      <Form.Item
        name={prop.name}
        rules={[
          {
            required: true,
            message: prop.message,
          },
          {
            type: 'email',
            message: prop.message,
          },
        ]}
      >
        <Input
          placeholder={prop.placeholder}
          autoComplete="off"
          className="field"
        />
      </Form.Item>
    );
  }

  return (
    <Form.Item
      name={prop.name}
      rules={[
        {
          required: true,
          message: prop.message,
        },
      ]}
    >
      <Input
        placeholder={prop.placeholder}
        autoComplete="off"
        className="field"
      />
    </Form.Item>
  );
};

InputField.propType = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default InputField;
