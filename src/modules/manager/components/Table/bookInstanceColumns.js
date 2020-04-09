import React from 'react';
import moment from 'moment';
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
    dataIndex: '_id',
  },
  {
    title: 'Status',
    className: 'column-style',
    dataIndex: 'isAvailable',
    ...getColumnSearchProps(
      'isAvailable',
      searchInput,
      handleSearch,
      handleReset,
      searchColumn,
      searchText,
    ),
    render: record => {
      return (
        <Tag color={record ? 'green' : 'red'}>
          {record ? 'Available' : 'Reserved'}
        </Tag>
      );
    },
  },
  {
    title: 'Date Available',
    className: 'column-style',
    dataIndex: 'dateAvailable',
    ...getColumnSearchProps(
      'dateAvailable',
      searchInput,
      handleSearch,
      handleReset,
      searchColumn,
      searchText,
    ),
    render: (text, record) => {
      if (!record.isAvailable) {
        return <span>{moment(text).fromNow()}</span>;
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
