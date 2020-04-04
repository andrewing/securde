import React from 'react';
import {Form, Input, Row, Button} from 'antd';

const AddReview = ({postReview}) => {
  const [form] = Form.useForm();
  const {TextArea} = Input;

  const onSubmit = () => {
    form
      .validateFields()
      .then(values => {
        postReview(values);
        form.resetFields();
      })
      .catch(info => {
        // console.log('Validate Failed:', info);
      });
  };

  return (
    <>
      <Form form={form}>
        <Row type="flex">
          <Form.Item name="review">
            <TextArea
              rows={2}
              placeholder="Leave a Review!"
              style={{width: 985, fontSize: 13}}
            />
          </Form.Item>

          <div style={{padding: 10}}>
            <Form.Item>
              <Button
                style={{backgroundColor: '#6c63ff', color: 'white'}}
                onClick={onSubmit}
              >
                Post Review
              </Button>
            </Form.Item>
          </div>
        </Row>
      </Form>
    </>
  );
};

export default AddReview;
