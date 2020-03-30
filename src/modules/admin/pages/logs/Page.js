import React from 'react';
import {Container, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
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

const logList = () => {
  // back end call

  return data.map((value, index) => {
    return (
      <tr key={value._id}>
        <td className="table-cell">
          {moment(value.time).format('YYYY-MM-DD HH:mm')}
        </td>
        <td className="table-cell">{value.content}</td>
      </tr>
    );
  });
};

const Page = () => {
  return (
    <>
      <h2>Activity Logs</h2>
      <Container className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="table-cell">Time</th>
              <th className="table-cell">Logs</th>
            </tr>
          </thead>
          <tbody>{logList()}</tbody>
        </Table>
      </Container>
    </>
  );
};

export default Page;
