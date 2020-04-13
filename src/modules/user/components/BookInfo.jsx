/* eslint-disable no-nested-ternary */
import React from 'react';
import {Descriptions, Tag, Divider} from 'antd';
import {Container, Button} from 'react-bootstrap';

const BookInfo = ({state, showBorrowBook, isAvailable, getEarliestDate}) => {
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

        <Descriptions.Item label="Status">
          {isAvailable ? (
            <Tag color="green">Available</Tag>
          ) : isAvailable === false ? (
            <Tag color="red">Reserved</Tag>
          ) : (
            <Tag color="default">Not Available</Tag>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Available By">
          {isAvailable ? (
            <Button
              variant="link"
              style={{
                color: '#6c63ff',
                fontSize: 13,
                padding: 0,
              }}
              onClick={() => showBorrowBook(state)}
            >
              Borrow Now
            </Button>
          ) : isAvailable === false ? (
            <span>{getEarliestDate()}</span>
          ) : (
            <Tag color="default">Not Available</Tag>
          )}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
    </Container>
  );
};

export default BookInfo;
