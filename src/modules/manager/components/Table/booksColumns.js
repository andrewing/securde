import React from 'react';
import {Row, Tooltip} from 'antd';
import {EyeOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';

const bookColumns = ({viewBook, editBook, deleteBook}) => [
  {
    title: 'Title',
    dataIndex: 'title',
    width: 250,
    align: 'left',
    ellipsis: true,
  },
  {
    title: 'Author/s',
    dataIndex: 'author',
    width: 300,
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
    title: 'Publisher',
    dataIndex: 'publisher',
    width: 250,
    align: 'left',
    ellipsis: true,
  },
  {
    title: 'Year Published',
    dataIndex: 'year_published',
  },
  {
    title: 'ISBN',
    dataIndex: 'ISBN',
  },
  {
    title: 'Call Number',
    dataIndex: 'call_number',
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
