import React from 'react'
import PropTypes from 'prop-types'
import { Form, Select } from 'antd';
const { Option } = Select;

const SelectField = (prop) => {

  const onChange = (value) => {
    
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
        <Select
          className='select-field'
          placeholder={prop.placeholder}
          onChange={onChange}
          defaultValue={prop.value}
        >
          {prop.data.map((value) => (
            <Option key={value} value={value}>{value}</Option>
          ))}
        </Select>
    </Form.Item>
  )
}

SelectField.propType = {
  name: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  message: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
}

export default SelectField;