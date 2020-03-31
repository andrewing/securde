import React from 'react';
import {Row, Icon, Tooltip} from 'antd';

const bookColumns = ({editBook, deleteBook}) => [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Author/s',
    dataIndex: 'author',
    width: 200,
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
    render: () => {
      return (
        <Row type="flex" justify="space-between">
          <Tooltip title="View Book">
            <Icon style={{color: '#6c63ff'}} type="eye" />
          </Tooltip>
          <Tooltip title="Edit Book">
            <Icon style={{color: '#6c63ff'}} type="edit" onClick={editBook} />
          </Tooltip>
          <Tooltip title="Delete Book">
            <Icon
              style={{color: '#fc6681'}}
              type="delete"
              onClick={deleteBook}
            />
          </Tooltip>
        </Row>
      );
    },
  },
];

export default bookColumns;
