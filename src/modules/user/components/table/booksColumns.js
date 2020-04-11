import React from 'react';
import getColumnSearchProps from './getColumnSearchProps';
import Status from './Status';
import Actions from './Actions';

const bookColumns = ({
  currPage,
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
    title: 'Status',
    className: 'column-style',
    width: 130,
    render: record => <Status record={record} currPage={currPage} />,
  },
  {
    title: 'Actions',
    className: 'column-style',
    width: 100,
    render: record => (
      <Actions
        record={record}
        showBorrowBook={showBorrowBook}
        currPage={currPage}
      />
    ),
  },
];

export default bookColumns;
