import React from 'react';
import {Descriptions, Tag, Divider} from 'antd';
import {Container, Button} from 'react-bootstrap';

const BookInfo = ({state, borrowBook}) => {
  return (
    <Container>
      <Descriptions bordered size="small" column={2}>
        <Descriptions.Item label="Publisher">
          {state.publisher}
        </Descriptions.Item>
        <Descriptions.Item label="Year Published">
          {state.year_published}
        </Descriptions.Item>
        <Descriptions.Item label="ISBN">{state.ISBN}</Descriptions.Item>
        <Descriptions.Item label="Call Number">
          {state.call_number}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          {state.status === 'Available' ? (
            <Tag color="green">{state.status}</Tag>
          ) : (
            <Tag color="red">{state.status}</Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Available By">
          {state.available_by ? (
            <span>{state.available_by}</span>
          ) : (
            <Button
              variant="link"
              style={{
                color: '#6c63ff',
                fontSize: 13,
                padding: 0,
              }}
              onClick={() => borrowBook(state)}
            >
              Borrow Now
            </Button>
          )}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
    </Container>
  );
};

export default BookInfo;
