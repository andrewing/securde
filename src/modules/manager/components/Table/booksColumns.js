import React from 'react';
import {Row, Tooltip} from 'antd';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';

const bookColumns = ({showEditModal, deleteBook}) => [
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
    dataIndex: 'authors',
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
        <Row type="flex" justify="space-around">
          <Tooltip title="Edit Book">
            <EditOutlined
              style={{color: '#6c63ff'}}
              onClick={e => {
                showEditModal(record);
              }}
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
