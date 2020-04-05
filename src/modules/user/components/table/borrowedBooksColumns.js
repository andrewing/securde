import React from 'react';
import {Tag} from 'antd';
import getColumnSearchProps from './getColumnSearchProps';

const borrowedBooksColumns = ({
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
    title: 'Days Left',
    className: 'column-style',
    dataIndex: 'days',
    width: 150,
    ...getColumnSearchProps(
      'days',
      searchInput,
      handleSearch,
      handleReset,
      searchColumn,
      searchText,
    ),
    render: record => {
      if (record === 'Returned') {
        return <Tag color="green">{record}</Tag>;
      }
      return <Tag color="red">{record}</Tag>;
    },
  },
];

export default borrowedBooksColumns;
