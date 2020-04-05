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
    title: 'ID',
    className: 'column-style',
    dataIndex: 'key',
  },
  {
    title: 'Status',
    className: 'column-style',
    dataIndex: 'status',
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
    dataIndex: 'available_by',
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
    render: record => {
      return (
        <Row type="flex" justify="space-around">
          <Tooltip title="Edit Book">
            <EditOutlined
              style={{color: '#6c63ff', padding: 3}}
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
