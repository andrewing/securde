import React from 'react';
import {Row, Tooltip} from 'antd';
import {EyeOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';

const bookColumns = ({viewBook, editBook, deleteBook}) => [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Author/s',
    width: 300,
    dataIndex: 'author',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Date Available',
    dataIndex: 'available',
  },
  {
    title: '',
    render: () => {
      return (
        <Row>
          <Tooltip title="View Book">
            <EyeOutlined style={{color: '#6c63ff'}} onClick={viewBook} />
          </Tooltip>
          <Tooltip title="Edit Book">
            <EditOutlined style={{color: '#6c63ff'}} onClick={editBook} />
          </Tooltip>
          <Tooltip title="Delete Book">
            <DeleteOutlined style={{color: '#fc6681'}} onClick={deleteBook} />
          </Tooltip>
        </Row>
      );
    },
  },
];

export default bookColumns;
