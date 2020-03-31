import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input} from 'antd'

const InputField = (prop) => {
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
        {prop.name !== 'password' ? 
          <Input placeholder={prop.placeholder} className='field' defaultValue={prop.value} value={prop.value}/>
        : <Input.Password placeholder={prop.placeholder} className='field' />}
    </Form.Item>
  )
}

InputField.propType = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default InputField;