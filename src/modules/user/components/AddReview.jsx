import React from 'react';
import {BeatLoader} from 'react-spinners';
import {Form, Input, Row, Button} from 'antd';

const AddReview = ({postReview, isLoading}) => {
  const [form] = Form.useForm();
  const {TextArea} = Input;

  const onSubmit = () => {
    form.validateFields().then(values => {
      postReview(values);
      form.resetFields();
    });
  };

  return (
    <>
      <Form form={form}>
        <Row type="flex">
          <Form.Item name="content">
            <TextArea
              rows={2}
              placeholder="Leave a Review!"
              style={{width: 985, fontSize: 13}}
            />
          </Form.Item>

          <div style={{padding: 10}}>
            <Button
              style={{backgroundColor: '#6c63ff', color: 'white'}}
              onClick={onSubmit}
            >
              {isLoading ? (
                <BeatLoader size={8} color="white" />
              ) : (
                'Post Review'
              )}
            </Button>
          </div>
        </Row>
      </Form>
    </>
  );
};

export default AddReview;
