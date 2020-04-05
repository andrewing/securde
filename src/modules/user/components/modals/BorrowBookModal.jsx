import React from 'react';
import {Modal, Form, Input} from 'antd';
import {Button} from 'react-bootstrap';
import BookInfoModal from './BookInfoModal';

const BorrowBookModal = ({showModal, data, borrowBook, handleClose}) => {
  const [form] = Form.useForm();

  const onSubmit = () => {
    form
      .validateFields()
      .then(values => {
        borrowBook(values);
        form.resetFields();
        handleClose();
      })
      .catch(info => {
        // console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="Borrow Book"
      visible={showModal}
      centered={true}
      footer={null}
      width={600}
      onCancel={() => {
        form.resetFields();
        handleClose();
      }}
    >
      <BookInfoModal data={data} />
      <Form form={form}>
        <Form.Item
          label="Days it will be borrowed "
          name="days"
          style={{paddingTop: 15}}
          rules={[
            {
              required: true,
              message: 'Required',
            },
          ]}
        >
          <Input
            style={{
              fontSize: 13,
              borderRadius: '5px',
              width: 80,
            }}
            type="number"
            autoComplete="off"
            placeholder="Days"
          />
        </Form.Item>
      </Form>

      <div style={{textAlign: 'center', paddingTop: 20}}>
        <Button
          bsPrefix="primary-button"
          style={{margin: '0px 17px'}}
          onClick={onSubmit}
        >
          Confirm
        </Button>

        <Button
          bsPrefix="secondary-button"
          style={{margin: '0px 19px'}}
          onClick={() => {
            form.resetFields();
            handleClose();
          }}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default BorrowBookModal;
