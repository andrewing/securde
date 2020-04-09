import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Tooltip, Tag} from 'antd';
import {EyeOutlined, BookOutlined} from '@ant-design/icons';
import getColumnSearchProps from './getColumnSearchProps';

const bookColumns = ({
  showBorrowBook,
  handleSearch,
  handleReset,
  searchText,
  searchColumn,
  searchInput,
}) => [
  {
    title: 'Title',
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
    title: 'Publisher',
    className: 'column-style',
    dataIndex: 'publisher',
    width: 220,
    align: 'left',
    ellipsis: true,
    ...getColumnSearchProps(
      'publisher',
      searchInput,
      handleSearch,
      handleReset,
      searchColumn,
      searchText,
    ),
    render: (text, record) => {
      return (
        <div>
          {record.publisher}
          <br />
          <small style={{fontStyle: 'italic'}}>
            Published at {record.yearOfPublication}
          </small>
        </div>
      );
    },
  },
  {
    title: 'ISBN',
    className: 'column-style',
    dataIndex: 'ISBN',
    width: 150,
    ...getColumnSearchProps(
      'ISBN',
      searchInput,
      handleSearch,
      handleReset,
      searchColumn,
      searchText,
    ),
  },
  {
    title: 'Call Number',
    className: 'column-style',
    dataIndex: 'callNumber',
    width: 130,
    ...getColumnSearchProps(
      'callNumber',
      searchInput,
      handleSearch,
      handleReset,
      searchColumn,
      searchText,
    ),
  },
  {
    title: 'Actions',
    className: 'column-style',
    width: 100,
    render: record => {
      return (
        <Row type="flex" justify="space-around">
          <Tooltip title="View Book">
            <Link
              to={{
                pathname: `/user/books/${record.title}`,
                state: {
                  id: record._id,
                  title: record.title,
                  authors: record.author,
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

          <Tooltip title="Borrow Book">
            <BookOutlined
              style={{color: '#6c63ff', padding: 3}}
              onClick={() => {
                showBorrowBook(record);
              }}
            />
          </Tooltip>
        </Row>
      );
    },
  },
];

export default bookColumns;
