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
    title: 'ISBN',
    className: 'column-style',
    dataIndex: 'ISBN',
    width: 120,
    align: 'left',
    ellipsis: true,
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
    dataIndex: 'call_number',
    width: 100,
    align: 'center',
    ellipsis: true,
    ...getColumnSearchProps(
      'call_number',
      searchInput,
      handleSearch,
      handleReset,
      searchColumn,
      searchText,
    ),
  },
];

export default bookColumns;
