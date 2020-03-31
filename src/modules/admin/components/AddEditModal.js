import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Modal, Row } from 'antd'
import InputField from '../components/InputField'
import SelectField from '../components/SelectField'

const questions = [
  'In what city did you have your first ever birthday party?',
  'What is the last name of your Science class teacher in high school?',
  'Which company manufactured your first mobile phone?',
  'Who was your childhood hero?',
  'Where was your best family vacation?',
];

const AddEditModal = prop => {
  const [show, setShow] = useState(false);

  const onCreate = (value) => {
    if(prop.command === 'Add') {
      prop.handleAdd({
        username: value.username,
        password: value.password,
        firstname: value.firstname,
        lastname: value.lastname,
        email: value.email,
        idNumber: value.idNumber,
        question: value.question,
        answer: value.answer,
        bookHistory: [],
      });
    } else if(prop.command === 'Edit') {
      const user = {...prop.user};
        user.firstname = value.firstname;
        user.lastname = value.lastname;
        user.password = value.password;
        user.email = value.email;
        user.idNumber = value.idNumber;
        user.question = value.question;
        user.answer = value.answer;
        prop.handleUpdate(user);
    }
    setShow(false);
  }
  
  /**
   * This function handles closing the modal and resetting the form.
   */
  const handleClose = () => setShow(false);

  /**
   * This function handles showing the modal.
   */
  const handleShow = () => setShow(true);

  const AddEditForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title={prop.command === 'Add' ? 'New Book Manager' : 'Edit Book Manager'}
        okText={prop.command === 'Add' ? 'Create' : 'Save'}
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onCreate(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            modifier: 'public',
          }}
        >
          <Row gutter={10}>
            <Col span={12}>
              <InputField name='firstname' message='Please input a valid name' placeholder='First Name' value={prop.command === 'Edit' ? prop.user.firstname : ""} />
            </Col>
            <Col span={12}>
              <InputField name='lastname' message='Please input a valid name' placeholder='Last Name' value={prop.command === 'Edit' ? prop.user.lastname : ""} />
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <InputField name='idNumber' message='Please input a valid ID Number' placeholder='ID Number' value={prop.command === 'Edit' ? prop.user.idNumber : ""} />
            </Col>
            <Col span={12}>
              <InputField name='email' message='Please input a valid email' placeholder='Email Address' value={prop.command === 'Edit' ? prop.user.email : ""} />
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <InputField name='username' message='Please input a valid username' placeholder='Username' value={prop.command === 'Edit' ? prop.user.username : ""} />
            </Col>
            <Col span={12}>
              <InputField name='password' message='Password should be at least 8 characters' placeholder='Password' value="" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <SelectField name='question' data={questions} message='This field is required' placeholder='Choose a security question' value={prop.command === 'Edit' ? prop.user.question : ""} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <InputField name='answer' message='This field is required' placeholder='Answer' value={prop.command === 'Edit' ? prop.user.answer : ""} />
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }

  return (
    <>
      {prop.command === 'Add' ? 
        <Button type='primary' onClick={handleShow} className='add-button'>Add</Button>
      : <Button type='primary' onClick={handleShow} className='button-table'>Edit</Button>}

      <AddEditForm 
        visible={show}
        onCreate={onCreate}
        onCancel={handleClose}  />
    </>
  );
};

AddEditModal.propType = {
  command: PropTypes.string.isRequired,
  user: PropTypes.object,
  handleAdd: PropTypes.func,
  handleUpdate: PropTypes.func,
};

export default AddEditModal;
