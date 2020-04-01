import React from 'react';
import {Row, Tooltip} from 'antd';
import {EyeOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';

const bookColumns = ({viewBook, editBook, deleteBook}) => [
  {
    title: 'Title',
    className: 'column-style',
    dataIndex: 'title',
    width: 250,
    align: 'left',
    ellipsis: true,
  },
  {
    title: 'Author/s',
    className: 'column-style',
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
    className: 'column-style',
    dataIndex: 'publisher',
    width: 250,
    align: 'left',
    ellipsis: true,
  },
  {
    title: 'Year Published',
    className: 'column-style',
    dataIndex: 'year_published',
  },
  {
    title: 'ISBN',
    className: 'column-style',
    dataIndex: 'ISBN',
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
        <Row type="flex" justify="space-between">
          <Tooltip title="View Book">
            <EyeOutlined
              style={{color: '#6c63ff'}}
              onClick={() => viewBook(record)}
            />
          </Tooltip>
          <Tooltip title="Edit Book">
            <EditOutlined
              style={{color: '#6c63ff'}}
              onClick={e => editBook(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Book">
            <DeleteOutlined
              style={{color: '#fc6681'}}
              onClick={e => deleteBook(record)}
            />
          </Tooltip>
        </Row>
      );
    },
  },
];

export default bookColumns;
