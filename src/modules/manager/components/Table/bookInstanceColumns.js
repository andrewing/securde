import React from 'react';
import {Row, Tooltip, Tag} from 'antd';
import {EyeOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';

const bookColumns = ({viewBook, editBook, deleteBook}) => [
  {
    title: 'Title',
    className: 'column-style',
    dataIndex: 'title',
    align: 'left',
  },
  {
    title: 'Author/s',
    className: 'column-style',
    dataIndex: 'author',
    align: 'left',
    ellipsis: true,
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
    render: (text, record) => {
      if (record.status === 'Reserved') {
        return <span>{text}</span>;
      }
      return <span>-</span>;
    },
  },
  {
    title: 'Actions',
    width: 100,
    render: () => {
      return (
        <Row type="flex" justify="space-between">
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
