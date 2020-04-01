import React from 'react';
import {Form, Modal, Input, notification, Select} from 'antd';
import {CheckCircleTwoTone} from '@ant-design/icons';
import {Button} from 'react-bootstrap';

const AddBookModal = ({showAddBook, handleClose}) => {
  const {Option} = Select;
  const [form] = Form.useForm();
  const items = ['Andrew Ing', 'Stanley Sie'];

  const onSubmit = event => {
    form
      .validateFields()
      .then(values => {
        notification.open({
          icon: <CheckCircleTwoTone twoToneColor="#52C41A" />,
          message: 'Successfully added a book!',
          description: 'The book is automatically added in the table.',
        });
        console.log(values);

        form.resetFields();
        handleClose();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="Add a Book"
      visible={showAddBook}
      okText="Submit"
      centered={true}
      footer={null}
      width={400}
      onOk={onSubmit}
      onCancel={() => {
        form.resetFields();
        handleClose();
      }}
    >
      <Form form={form}>
        <Form.Item
          name="title"
          style={{margin: '5px 10px'}}
          rules={[
            {
              required: true,
              message: 'Please input a book title',
            },
          ]}
        >
          <Input
            style={{fontSize: 13, padding: '3px 10px'}}
            autoComplete="off"
            placeholder="Book Title"
          />
        </Form.Item>

        <Form.Item
          name="authors"
          style={{margin: '5px 10px'}}
          rules={[
            {
              required: true,
              message: 'Please input an author',
            },
          ]}
        >
          <Select
            style={{fontSize: 13, fontWeight: 490}}
            placeholder="Author/s of the Book"
            mode="tags"
          >
            {items.map(item => (
              <Option style={{fontSize: 12}} value={item} key={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="publisher"
          style={{margin: '5px 10px'}}
          rules={[
            {
              required: true,
              message: 'Please input a publisher',
            },
          ]}
        >
          <Input
            style={{fontSize: 13, padding: '3px 10px'}}
            autoComplete="off"
            placeholder="Publisher of the Book"
          />
        </Form.Item>

        <Form.Item
          name="year_published"
          style={{margin: '5px 10px'}}
          rules={[
            {
              required: true,
              message: 'Please input when it was published',
            },
          ]}
        >
          <Input
            style={{fontSize: 13, padding: '3px 10px'}}
            autoComplete="off"
            placeholder="Publisher of the Book"
          />
        </Form.Item>

        <Form.Item
          name="ISBN"
          style={{margin: '5px 10px'}}
          rules={[
            {
              required: true,
              message: 'Please input ISBN of the book',
            },
            {
              min: 13,
              message: 'Please input valid ISBN',
            },
          ]}
        >
          <Input
            type="number"
            style={{fontSize: 13, padding: '3px 10px'}}
            autoComplete="off"
            placeholder="ISBN of the book"
          />
        </Form.Item>

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
      </Form>
    </Modal>
  );
};

export default AddBookModal;
