import React from 'react';
import {Container, Jumbotron} from 'react-bootstrap';
import SystemLogList from '../../components/SystemLogList';

/* DUMMY DATA */
const data = [
  {
    _id: '5e7a1857e7c0e02d7844fe97',
    time: '2020-03-24 12:25',
    action: 'ADD',
    content: 'Book manager added a new book [book title1]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe91',
    time: '2020-03-24 23:25',
    action: 'ADD',
    content: 'Book manager added a new book [book title2]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe92',
    time: '2020-03-24 22:00',
    action: 'DELETE',
    content: 'Book manager deleted a book [book title3]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe93',
    time: '2020-03-24 21:25',
    action: 'UPDATE',
    content: 'Book manager updated a book [book title4]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24 11:25',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24 11:25',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24 11:25',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24 11:25',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24 11:25',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24 11:25',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24 11:25',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24 11:25',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24 11:25',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24 11:25',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24 11:25',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24 11:25',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24 11:25',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe94',
    time: '2020-03-24 11:25',
    action: 'ADD',
    content: 'Book manager added a new book [book title5]',
    account: {},
    __v: 0,
  },
];

const Page = () => {
  return (
    <>
      <Jumbotron bsPrefix="page-header" fluid>
        <Container className="inner-container">
          <h1 style={{color: '#6C4CC5'}}>System Logs</h1>
          <p>Manage activities in your online library.</p>
        </Container>
      </Jumbotron>

      <div className="content-container">
        <SystemLogList data={data} />
      </div>
    </>
  );
};

export default Page;
