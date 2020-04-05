import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Tooltip, Tag} from 'antd';
import {EyeOutlined, BookOutlined} from '@ant-design/icons';
import getColumnSearchProps from './getColumnSearchProps';

const bookColumns = ({
  showBorrowModal,
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
    dataIndex: 'authors',
    width: 250,
    align: 'left',
    ellipsis: true,
    ...getColumnSearchProps(
      'authors',
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
            Published at {record.year_published}
          </small>
        </div>
      );
    },
  },
  {
    title: 'Status',
    className: 'column-style',
    dataIndex: 'status',
    width: 150,
    ...getColumnSearchProps(
      'status',
      searchInput,
      handleSearch,
      handleReset,
      searchColumn,
      searchText,
    ),
    render: record => {
      if (record === 'Available') {
        return <Tag color="green">{record}</Tag>;
      }
      return <Tag color="red">{record}</Tag>;
    },
  },
  {
    title: 'Available By',
    className: 'column-style',
    dataIndex: 'available_by',
    width: 130,
    ...getColumnSearchProps(
      'available_by',
      searchInput,
      handleSearch,
      handleReset,
      searchColumn,
      searchText,
    ),
    render: (text, record) => {
      if (record.status === 'Reserved') {
        return <span>{text}</span>;
      }
      return <span>-</span>;
    },
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
                  title: record.title,
                  authors: record.authors,
                  publisher: record.publisher,
                  year_published: record.year_published,
                  ISBN: record.ISBN,
                  call_number: record.call_number,
                  status: record.status,
                  available_by: record.available_by,
                },
              }}
            >
              <EyeOutlined style={{color: '#6c63ff'}} />
            </Link>
          </Tooltip>

          <Tooltip title="Borrow Book">
            <BookOutlined
              style={{color: '#6c63ff'}}
              onClick={() => {
                showBorrowModal(record);
              }}
            />
          </Tooltip>
        </Row>
      );
    },
  },
];

export default bookColumns;
