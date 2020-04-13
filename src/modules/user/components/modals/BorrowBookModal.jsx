import React, {useState, useEffect} from 'react';
import {Modal, Form, Input} from 'antd';
import {BeatLoader} from 'react-spinners';
import {Button} from 'react-bootstrap';
import BookInfoModal from './BookInfoModal';
import {
  getBookInstanceByBook,
  borrowBookInstance,
} from '../../../../api/bookInstance/index';

const BorrowBookModal = ({
  showModal,
  selectedBook,
  handleClose,
  setNotification,
  refreshData,
}) => {
  const [form] = Form.useForm();
  const [allInstances, setInstances] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const onSubmit = () => {
    form.validateFields().then(values => {
      values = {
        days: values.days,
      };
      setLoading(true);
      borrowBook(values);
      form.resetFields();
    });
  };

  useEffect(() => {
    if (selectedBook)
      getBookInstanceByBook(selectedBook._id).then(res => {
        const {data} = res;
        setInstances(data.bookInstances);
      });
  }, [selectedBook]);

  const borrowBook = values => {
    const availableBook = allInstances.find(item => item.isAvailable);
    borrowBookInstance(values, availableBook._id)
      .then(res => {
        setNotification(res);
        setLoading(false);
        refreshData();
        handleClose();
      })
      .catch(err => {
        setNotification({isSuccess: false, message: err.message});
        setLoading(false);
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
      <BookInfoModal data={selectedBook} />
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
          {isLoading ? <BeatLoader size={8} color="white" /> : 'Confirm'}
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
