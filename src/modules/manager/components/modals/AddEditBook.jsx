import React, {useEffect, useState} from 'react';
import {Form, Modal, Input, Select} from 'antd';
import {Button} from 'react-bootstrap';

const AddEditBook = ({
  showAddBook,
  handleClose,
  action,
  onCreateBook,
  onEditBook,
  data,
}) => {
  const {Option} = Select;
  const [form] = Form.useForm();
  const items = ['Andrew Ing', 'Stanley Sie'];

  const onSubmit = () => {
    form
      .validateFields()
      .then(values => {
        action === 'add' ? onCreateBook(values) : onEditBook(values);

        form.resetFields();
        handleClose();
      })
      .catch(info => {
        // console.log('Validate Failed:', info);
      });
  };

  const setValues = () => {
    if (data)
      form.setFieldsValue({
        title: data.title,
        authors: data.authors,
        publisher: data.publisher,
        year_published: data.year_published,
        ISBN: data.ISBN,
      });
  };

  useEffect(() => {
    if (action === 'edit') setValues();
    else if (action === 'add') form.resetFields();
  });

  return (
    <Modal
      title={action === 'add' ? 'Add Book' : 'Edit Book'}
      visible={showAddBook}
      okText="Submit"
      centered={true}
      footer={null}
      width={400}
      destroyOnClose={false}
      getContainer={false}
      forceRender={true}
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
            style={{fontSize: 13, padding: '3px 10px', borderRadius: '5px'}}
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
            style={{fontSize: 13, padding: '3px 10px', borderRadius: '5px'}}
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
            style={{fontSize: 13, padding: '3px 10px', borderRadius: '5px'}}
            autoComplete="off"
            placeholder="Year of the publication"
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
            style={{fontSize: 13, padding: '3px 10px', borderRadius: '5px'}}
            autoComplete="off"
            placeholder="ISBN of the book"
          />
        </Form.Item>

        <div style={{textAlign: 'center', paddingTop: 20}}>
          {action === 'add' ? (
            <Button
              bsPrefix="primary-button"
              style={{margin: '0px 17px'}}
              onClick={onSubmit}
            >
              Add
            </Button>
          ) : (
            <Button
              bsPrefix="primary-button"
              style={{margin: '0px 17px'}}
              onClick={onSubmit}
            >
              Edit
            </Button>
          )}

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

export default AddEditBook;
