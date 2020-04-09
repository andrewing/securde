import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Tooltip} from 'antd';
import {EditOutlined, SettingOutlined} from '@ant-design/icons';
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
    width: 250,
    align: 'left',
    ellipsis: true,
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
    dataIndex: 'author',
    width: 300,
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
    title: 'Publisher',
    className: 'column-style',
    dataIndex: 'publisher',
    width: 250,
    align: 'left',
    ellipsis: true,
    ...getColumnSearchProps(
      'publisher',
      searchInput,
      handleSearch,
      handleReset,
      searchColumn,
      searchText,
    ),
  },
  {
    title: 'Year Published',
    className: 'column-style',
    dataIndex: 'yearOfPublication',
    ...getColumnSearchProps(
      'yearOfPublication',
      searchInput,
      handleSearch,
      handleReset,
      searchColumn,
      searchText,
    ),
  },
  {
    title: 'ISBN',
    className: 'column-style',
    dataIndex: 'ISBN',
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
    title: 'Call Number',
    className: 'column-style',
    dataIndex: 'callNumber',
  },
  {
    title: 'Actions',
    className: 'column-style',
    width: 100,
    render: record => {
      return (
        <Row type="flex" justify="space-around">
          <Tooltip title="Manage This Book">
            <Link
              to={{
                pathname: `/manager/manage-books/${record.title}`,
                state: {
                  id: record._id,
                  title: record.title,
                  author: record.author,
                  publisher: record.publisher,
                  yearOfPublication: record.yearOfPublication,
                  ISBN: record.ISBN,
                  status: record.status,
                  callNumber: record.callNumber,
                },
              }}
            >
              <SettingOutlined style={{color: '#6c63ff'}} />
            </Link>
          </Tooltip>

          <Tooltip title="Edit Book">
            <EditOutlined
              style={{color: '#6c63ff', padding: 3}}
              onClick={e => {
                showEditModal(record);
              }}
            />
          </Tooltip>
          <DeleteModal record={record} deleteBook={deleteBook} type="book" />
        </Row>
      );
    },
  },
];

export default bookColumns;
