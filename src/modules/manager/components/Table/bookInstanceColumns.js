import React from 'react';
import {Row, Icon, Tooltip} from 'antd';

const bookColumns = props => [
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
            <Icon style={{color: '#6c63ff'}} type="eye" />
          </Tooltip>
          <Tooltip title="Edit Book">
            <Icon style={{color: '#6c63ff'}} type="edit" />
          </Tooltip>
          <Tooltip title="Delete Book">
            <Icon style={{color: '#6c63ff'}} type="delete" />
          </Tooltip>
        </Row>
      );
    },
  },
];

export default bookColumns;
