import React, {useEffect, useState} from 'react';
import {Form, Modal, Select, DatePicker, Tag} from 'antd';
import {Button} from 'react-bootstrap';
import {BeatLoader} from 'react-spinners';
import moment from 'moment';
import {editBookInstance} from '../../../../api/bookInstance';
import {auth} from '../../../../api/auth';

const AddEditInstance = ({
  editVisible,
  handleClose,
  action,
  data,
  setNotification,
  setLoading,
  isLoading,
}) => {
  const {Option} = Select;
  const [form] = Form.useForm();
  const [dateDisabled, setDateDisable] = useState(false);

  useEffect(() => {
    setValues();
    setDateDisable(data.isAvailable);
  }, [editVisible]);

  const onSubmit = () => {
    form.validateFields().then(async values => {
      values = {
        isAvailable: values.isAvailable === 'Available',
        dateAvailable: moment(values.dateAvailable).format(),
      };
      setLoading(true);
      editBookInstance(data._id, values)
        .then(res => {
          setNotification(res);
          setLoading(false);
          form.resetFields();
          handleClose();
        })
        .catch(err => {
          setNotification(err);
        });
    });
  };

  const setValues = () => {
    if (data)
      form.setFieldsValue({
        isAvailable: data.isAvailable ? 'Available' : 'Reserved',
        dateAvailable: data.isAvailable ? null : moment(data.dateAvailable),
      });
  };

  const handleChange = (_, all) => {
    setDateDisable(all.isAvailable === 'Available');
  };

  return (
    <Modal
      title="Edit Book Instance"
      visible={editVisible}
      okText="Submit"
      centered={true}
      footer={null}
      width={400}
      destroyOnClose={true}
      onOk={onSubmit}
      onCancel={() => {
        form.resetFields();
        handleClose();
      }}
    >
      <Form form={form} onValuesChange={handleChange}>
        <Form.Item
          name="isAvailable"
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
            <Option value="Available">
              <Tag color="green">Available</Tag>
            </Option>
            <Option value="Reserved">
              <Tag color="red">Reserved</Tag>
            </Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="dateAvailable"
          style={{margin: '5px 10px'}}
          rules={[
            {
              required: !dateDisabled,
              message: 'Please input when the book will be available',
            },
          ]}
        >
          <DatePicker
            style={{width: 332}}
            format="MMMM D, YYYY"
            placeholder="Date availablity of the book"
            disabled={dateDisabled}
          />
        </Form.Item>

        <div style={{textAlign: 'center', paddingTop: 20}}>
          <Button
            bsPrefix="primary-button"
            style={{margin: '0px 17px'}}
            onClick={onSubmit}
          >
            {isLoading ? <BeatLoader size="8" color="white" /> : 'Edit'}
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

export default AddEditInstance;
