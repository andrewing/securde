import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Button, Col, Form, Modal, Row, Tooltip} from 'antd';
import {EditOutlined} from '@ant-design/icons';
import InputField from './InputField';
import SelectField from './SelectField';

/**
 * List of questions
 */
const questions = [
  'In what city did you have your first ever birthday party?',
  'What is the last name of your Science class teacher in high school?',
  'Which company manufactured your first mobile phone?',
  'Who was your childhood hero?',
  'Where was your best family vacation?',
];

const AddEditModal = prop => {
  const [show, setShow] = useState(false);

  /**
   * This function handles submitting the form to back end.
   * @param { object } value - object contains the value of the form
   */
  const onCreate = value => {
    if (prop.command === 'Add') {
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
    } else if (prop.command === 'Edit') {
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
  };

  /**
   * This function handles closing the modal and resetting the form.
   */
  const handleClose = () => setShow(false);

  /**
   * This function handles showing the modal.
   */
  const handleShow = () => setShow(true);

  const AddEditForm = ({visible, onSubmit, onCancel}) => {
    const [form] = Form.useForm();

    useEffect(() => {
      if (prop.command === 'Edit') {
        form.setFieldsValue({
          firstname: prop.user.firstname,
          lastname: prop.user.lastname,
          username: prop.user.username,
          email: prop.user.email,
          idNumber: prop.user.idNumber,
          answer: prop.user.answer,
        });

        if (prop.user.question.length > 0) {
          form.setFieldsValue({
            question: prop.user.question,
          });
        }
      }
    }, [prop.command]);

    return (
      <Modal
        className="admin-modal"
        visible={visible}
        destroyOnClose={false}
        getContainer={false}
        footer={null}
        title={
          prop.command === 'Add' ? 'New Book Manager' : 'Edit Book Manager'
        }
        okText={prop.command === 'Add' ? 'Create' : 'Save'}
        cancelText="Cancel"
        centered
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onSubmit(values);
            })
            .catch(info => {});
        }}
      >
        <Form form={form} layout="vertical">
          <Row gutter={10}>
            <Col span={12}>
              <InputField
                name="firstname"
                message="Please input a valid name"
                placeholder="First Name"
              />
            </Col>
            <Col span={12}>
              <InputField
                name="lastname"
                message="Please input a valid name"
                placeholder="Last Name"
              />
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <InputField
                name="idNumber"
                message="Please input a valid ID Number"
                placeholder="ID Number"
              />
            </Col>
            <Col span={12}>
              <InputField
                name="email"
                message="Please input a valid email"
                placeholder="Email Address"
              />
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <InputField
                name="username"
                message="Please input a valid username"
                placeholder="Username"
              />
            </Col>
            <Col span={12}>
              <InputField
                name="password"
                message="Password should be at least 8 characters"
                placeholder="Password"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <SelectField
                name="question"
                data={questions}
                message="This field is required"
                placeholder="Choose a security question"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <InputField
                name="answer"
                message="This field is required"
                placeholder="Answer"
              />
            </Col>
          </Row>
        </Form>
        <div style={{textAlign: 'center', paddingTop: 20}}>
          {prop.command === 'Add' ? (
            <Button
              bsPrefix="primary-button"
              style={{
                margin: '0px 17px',
                background: '#6C63FF',
                color: 'white',
              }}
              onClick={() => {
                form
                  .validateFields()
                  .then(values => {
                    form.resetFields();
                    onSubmit(values);
                  })
                  .catch(info => {});
              }}
            >
              Create
            </Button>
          ) : (
            <Button
              bsPrefix="primary-button"
              style={{
                margin: '0px 17px',
                background: '#6C63FF',
                color: 'white',
              }}
              onClick={() => {
                form
                  .validateFields()
                  .then(values => {
                    form.resetFields();
                    onSubmit(values);
                  })
                  .catch(info => {});
              }}
            >
              Edit
            </Button>
          )}

          <Button
            style={{margin: '0px 19px', background: '#fc6681', color: 'white'}}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    );
  };

  return (
    <>
      {prop.command === 'Add' ? (
        <Button
          onClick={handleShow}
          style={{background: '#6C63FF', color: 'white'}}
        >
          Add Book Manager
        </Button>
      ) : (
        <Tooltip title="Edit Book Manager">
          <EditOutlined onClick={handleShow} style={{color: '#6c63ff'}} />
        </Tooltip>
      )}

      <AddEditForm visible={show} onSubmit={onCreate} onCancel={handleClose} />
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
