import React from 'react';
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
    render: (_, record) => {
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
    dataIndex: 'callNumber',
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
