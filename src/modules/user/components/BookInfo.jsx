/* eslint-disable no-nested-ternary */
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Descriptions, Tag, Divider} from 'antd';
import {Container, Button} from 'react-bootstrap';
import {getBookInstanceByBook} from '../../../api/bookInstance/index';

const BookInfo = ({state, showBorrowBook}) => {
  const [isAvailable, setAvailability] = useState(null);
  const [datesAvailable, setDates] = useState([]);

  useEffect(() => {
    getBookInstanceByBook(state._id).then(res => {
      const {data} = res;
      const dates = [];
      const instances = data.bookInstances;

      if (instances.length) {
        instances.map(item => {
          if (item.isAvailable === false) {
            dates.push(
              moment(item.dateAvailable).format('MMMM Do YYYY, h:mm:ss a'),
            );
            return setAvailability(false);
          }
          return setAvailability(true);
        });
      }

      setDates(dates);
    });
  }, []);

  const getEarliestDate = () => {
    if (datesAvailable) {
      return datesAvailable.sort()[0];
    }
    return null;
  };

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
