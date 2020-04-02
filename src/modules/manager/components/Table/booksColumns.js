import React from 'react';
import {Row, Tooltip} from 'antd';
import {EditOutlined} from '@ant-design/icons';
import DeleteModal from '../modals/DeleteModal';
import getColumnSearchProps from './getColumnSearchProps';

const bookColumns = ({
  showEditModal,
  deleteBook,
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
    width: 250,
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
  },
  {
    title: 'Author/s',
    className: 'column-style',
    dataIndex: 'authors',
    width: 300,
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
    width: 250,
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
  },
  {
    title: 'Year Published',
    className: 'column-style',
    dataIndex: 'year_published',
    ...getColumnSearchProps(
      'year_published',
      searchInput,
      handleSearch,
      handleReset,
      searchColumn,
      searchText,
    ),
  },
  {
    title: 'ISBN',
    className: 'column-style',
    dataIndex: 'ISBN',
    ...getColumnSearchProps(
      'title',
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
  },
  {
    title: 'Actions',
    className: 'column-style',
    width: 100,
    render: record => {
      return (
        <Row type="flex" justify="space-around">
          <Tooltip title="Edit Book">
            <EditOutlined
              style={{color: '#6c63ff'}}
              onClick={e => {
                showEditModal(record);
              }}
            />
          </Tooltip>
          <DeleteModal record={record} deleteBook={deleteBook} type="book" />
        </Row>
      );
    },
  },
];

export default bookColumns;
