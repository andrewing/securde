import React from 'react';
import {Descriptions, Divider} from 'antd';
import {Container} from 'react-bootstrap';

const BookInfo = ({state}) => {
  return (
    <Container>
      <Descriptions bordered size="small" column={2}>
        <Descriptions.Item label="Publisher">
          {state.publisher}
        </Descriptions.Item>
        <Descriptions.Item label="Year Published">
          {state.yearOfPublication}
        </Descriptions.Item>
        <Descriptions.Item label="ISBN">{state.ISBN}</Descriptions.Item>
        <Descriptions.Item label="Call Number">
          {state.callNumber}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
    </Container>
  );
};

export default BookInfo;
