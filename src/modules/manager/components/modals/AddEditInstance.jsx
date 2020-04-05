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

  const onSubmit = () => {
    form
      .validateFields()
      .then(values => {
        values = {
          status: values.status,
          available_by: values.available_by.format('YYYY-MM-DD HH:mm'),
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
        status: data.status,
        available_by: moment(data.available_by),
      });
  };

  useEffect(() => {
    if (action === 'edit') setValues();
    else if (action === 'add') form.resetFields();
  });

  return (
    <Modal
      title={action === 'add' ? 'Add Book Instance' : 'Edit Book Instance'}
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
          name="available_by"
          style={{margin: '5px 10px'}}
          rules={[
            {
              required: true,
              message: 'Please input when the book will be available',
            },
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

export default AddEditInstance;
