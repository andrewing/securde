import React from 'react';
import {Table} from 'antd';
import {Container, Jumbotron} from 'react-bootstrap';
import moment from 'moment';

const data = [
  {
    _id: '5e7a1857e7c0e02d7844fe97',
    time: '2020-03-24T12:25:27+08:00',
    action: 'ADD',
    content: 'Book manager added a new book [book title1]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe91',
    time: '2020-03-24T23:25:27+08:00',
    action: 'ADD',
    content: 'Book manager added a new book [book title2]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe92',
    time: '2020-03-24T22:00:27+08:00',
    action: 'DELETE',
    content: 'Book manager deleted a book [book title3]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe93',
    time: '2020-03-24T21:25:27+08:00',
    action: 'UPDATE',
    content: 'Book manager updated a book [book title4]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24T11:25:27+08:00',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24T11:25:27+08:00',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24T11:25:27+08:00',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24T11:25:27+08:00',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24T11:25:27+08:00',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24T11:25:27+08:00',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24T11:25:27+08:00',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24T11:25:27+08:00',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24T11:25:27+08:00',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24T11:25:27+08:00',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24T11:25:27+08:00',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24T11:25:27+08:00',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24T11:25:27+08:00',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24T11:25:27+08:00',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
];

const Page = () => {
  const columns = [
    {
      title: 'Date/Time',
      dataIndex: 'time',
      key: 'time',
      render: time => <span>{moment(time).format('YYYY-MM-DD HH:mm')}</span>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Logs',
      dataIndex: 'content',
      key: 'content',
    },
  ];
  return (
    <>
      <Jumbotron bsPrefix="page-header" fluid>
        <Container className="inner-container">
          <h1 style={{color: '#6c63ff'}}>System Logs</h1>
          <p>Manage activities in your online library.</p>
        </Container>
      </Jumbotron>

      <div className="content-container">
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={{position: ['bottomCenter', 'bottomCenter']}}
        />
      </div>
    </>
  );
};

export default Page;
