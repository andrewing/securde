import React, {useEffect} from 'react';
import {Form, Modal, Input, Select, DatePicker} from 'antd';
import {Button} from 'react-bootstrap';
import moment from 'moment';

const AddEditInstance = ({
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
        values = {
          title: values.title,
          authors: values.authors,
          status: values.status,
          available: values.available.format('YYYY-MM-DD HH:mm'),
        };
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
        status: data.status,
        available: moment(data.available),
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
          name="status"
          style={{margin: '5px 10px'}}
          rules={[
            {
              required: true,
              message: 'Please input the status of the book',
            },
          ]}
        >
          <Select
            style={{fontSize: 13}}
            placeholder="Choose the status of the book"
          >
            <Option value="Available">Available</Option>
            <Option value="Reserved">Reserved</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="available"
          style={{margin: '5px 10px'}}
          rules={[
            () => ({
              validator(rule, value) {
                if (form.getFieldValue('status') === 'Reserved' && !value) {
                  return Promise.reject(
                    'This is required if the book is reserved.',
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <DatePicker
            style={{width: 332}}
            format="YYYY-MM-DD HH:mm"
            placeholder="Date availablity of the book"
          />
        </Form.Item>

        <div style={{textAlign: 'center', paddingTop: 20}}>
          {action === 'add' ? (
            <Button
              bsPrefix="primary-button"
              style={{margin: '0px 17px'}}
              onClick={onSubmit}
            >
              Confirm
            </Button>
          ) : (
            <Button
              bsPrefix="primary-button"
              style={{margin: '0px 17px'}}
              onClick={onSubmit}
            >
              Add
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

export default AddEditInstance;
