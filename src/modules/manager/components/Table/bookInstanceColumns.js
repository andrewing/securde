import React from 'react';
import {Row, Tooltip, Tag} from 'antd';
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
    align: 'left',
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
    title: 'Status',
    className: 'column-style',
    dataIndex: 'status',
    width: 200,
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
    title: 'Date Available',
    className: 'column-style',
    dataIndex: 'available',
    width: 250,
    ...getColumnSearchProps(
      'available',
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
          <Tooltip title="Edit Book">
            <EditOutlined
              style={{color: '#6c63ff'}}
              onClick={() => {
                showEditModal(record);
              }}
            />
          </Tooltip>
          <DeleteModal
            record={record}
            deleteBook={deleteBook}
            type="instance"
          />
        </Row>
      );
    },
  },
];

export default bookColumns;
