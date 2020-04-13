import React from 'react';
import {Button} from 'react-bootstrap';
import getColumnSearchProps from './getColumnSearchProps';

const borrowedBooksColumns = ({
  returnBook,
  handleSearch,
  handleReset,
  searchText,
  searchColumn,
  searchInput,
}) => [
  {
    title: 'Book Title',
    className: 'column-style',
    dataIndex: 'title',
    width: 220,
    align: 'left',
    ellipsis: true,
    ...getColumnSearchProps(
      'title',
      searchInput,
      handleSearch,
      handleReset,
      searchColumn,
      searchText,
    ),
    render: record => {
      return (
        <div
          style={{overflow: 'hidden', textOverflow: 'ellipsis'}}
          title={record}
        >
          {record}
        </div>
      );
    },
  },
  {
    title: 'Author/s',
    className: 'column-style',
    dataIndex: 'author',
    width: 250,
    align: 'left',
    ellipsis: true,
    ...getColumnSearchProps(
      'author',
      searchInput,
      handleSearch,
      handleReset,
      searchColumn,
      searchText,
    ),
    render: record => {
      return (
        <div
          style={{overflow: 'hidden', textOverflow: 'ellipsis'}}
          title={record}
        >
          {record.map((item, i) => {
            if (i === record.length - 1) {
              return <span key={i}>{item} </span>;
            }
            return <span key={i}>{item}, </span>;
          })}
        </div>
      );
    },
  },
  {
    title: 'Time Borrowed',
    className: 'column-style',
    dataIndex: 'timeBorrowed',
    width: 150,
    ...getColumnSearchProps(
      'timeBorrowed',
      searchInput,
      handleSearch,
      handleReset,
      searchColumn,
      searchText,
    ),
  },
  {
    title: 'Time Returned',
    className: 'column-style',
    width: 150,
    ...getColumnSearchProps(
      'timeReturned',
      searchInput,
      handleSearch,
      handleReset,
      searchColumn,
      searchText,
    ),
    render: record => {
      return (
        <>
          {record.timeReturned === 'return' ? (
            <Button
              variant="link"
              style={{
                color: '#6c63ff',
              }}
              onClick={() => returnBook(record)}
            >
              Return Book
            </Button>
          ) : (
            <span>{record.timeReturned}</span>
          )}
        </>
      );
    },
  },
];

export default borrowedBooksColumns;
