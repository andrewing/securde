import React, {useState, useEffect} from 'react';
import {Row, Tooltip} from 'antd';
import {Link} from 'react-router-dom';
import {EyeOutlined, BookOutlined} from '@ant-design/icons';
import {getBookInstanceByBook} from '../../../../api/bookInstance/index';

const Actions = ({record, showBorrowBook}) => {
  const [isAvailable, setAvailability] = useState(null);

  useEffect(() => {
    getBookInstanceByBook(record._id).then(res => {
      const {data} = res;
      const instances = data.bookInstances;

      if (instances.length) {
        instances.map(item => {
          if (item.isAvailable === false) return setAvailability(false);
          return setAvailability(true);
        });
      }
    });
  }, []);

  return (
    <Row type="flex" justify="space-around">
      <Tooltip title="View Book">
        <Link
          to={{
            pathname: `/user/books/${record.title}`,
            state: {
              id: record._id,
              title: record.title,
              author: record.author,
              publisher: record.publisher,
              yearOfPublication: record.yearOfPublication,
              ISBN: record.ISBN,
              callNumber: record.callNumber,
            },
          }}
        >
          <EyeOutlined style={{color: '#6c63ff'}} />
        </Link>
      </Tooltip>

      {isAvailable ? (
        <Tooltip title="Borrow Book">
          <BookOutlined
            style={{color: '#6c63ff', padding: 3}}
            onClick={() => {
              showBorrowBook(record);
            }}
          />
        </Tooltip>
      ) : (
        ''
      )}
    </Row>
  );
};

export default Actions;
