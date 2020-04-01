import React, {Component} from 'react';
import {Row, Table} from 'antd';
import {Container, Jumbotron} from 'react-bootstrap';
import AddEditModal from '../../components/AddEditModal';
import DeleteModal from '../../components/DeleteModal';
import ViewModal from '../../components/ViewModal';

const data = [
  {
    _id: '5e7a1857e7c0e02d7844fe97',
    firstname: 'Book',
    lastname: 'Manager',
    username: 'username',
    password: '',
    email: 'bookmanager@email.com',
    idNumber: '12312312',
    question: 'In what city did you have your first ever birthday party?',
    answer: '',
    userType: 'BOOK_MANAGER',
    bookHistory: [],
    salt: '',
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe97',
    firstname: 'Book',
    lastname: 'Manager',
    username: 'username',
    password: '',
    email: 'bookmanager@email.com',
    idNumber: '12312312',
    question: '',
    answer: '',
    userType: 'BOOK_MANAGER',
    bookHistory: [],
    salt: '',
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe97',
    firstname: 'Book',
    lastname: 'Manager',
    username: 'username',
    password: '',
    email: 'bookmanager@email.com',
    idNumber: '12312312',
    question: '',
    answer: '',
    userType: 'BOOK_MANAGER',
    bookHistory: [],
    salt: '',
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe97',
    firstname: 'Book',
    lastname: 'Manager',
    username: 'username',
    password: '',
    email: 'bookmanager@email.com',
    idNumber: '12312312',
    question: '',
    answer: '',
    userType: 'BOOK_MANAGER',
    bookHistory: [],
    salt: '',
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe97',
    firstname: 'Book',
    lastname: 'Manager',
    username: 'username',
    password: '',
    email: 'bookmanager@email.com',
    idNumber: '12312312',
    question: '',
    answer: '',
    userType: 'BOOK_MANAGER',
    bookHistory: [],
    salt: '',
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe97',
    firstname: 'Book',
    lastname: 'Manager',
    username: 'username',
    password: '',
    email: 'bookmanager@email.com',
    idNumber: '12312312',
    question: '',
    answer: '',
    userType: 'BOOK_MANAGER',
    bookHistory: [],
    salt: '',
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe97',
    firstname: 'Book',
    lastname: 'Manager',
    username: 'username',
    password: '',
    email: 'bookmanager@email.com',
    idNumber: '12312312',
    question: '',
    answer: '',
    userType: 'BOOK_MANAGER',
    bookHistory: [],
    salt: '',
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe97',
    firstname: 'Book',
    lastname: 'Manager',
    username: 'username',
    password: '',
    email: 'bookmanager@email.com',
    idNumber: '12312312',
    question: '',
    answer: '',
    userType: 'BOOK_MANAGER',
    bookHistory: [],
    salt: '',
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe97',
    firstname: 'Book',
    lastname: 'Manager',
    username: 'username',
    password: '',
    email: 'bookmanager@email.com',
    idNumber: '12312312',
    question: '',
    answer: '',
    userType: 'BOOK_MANAGER',
    bookHistory: [],
    salt: '',
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe97',
    firstname: 'Book',
    lastname: 'Manager',
    username: 'username',
    password: '',
    email: 'bookmanager@email.com',
    idNumber: '12312312',
    question: '',
    answer: '',
    userType: 'BOOK_MANAGER',
    bookHistory: [],
    salt: '',
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe97',
    firstname: 'Book',
    lastname: 'Manager',
    username: 'username',
    password: '',
    email: 'bookmanager@email.com',
    idNumber: '12312312',
    question: '',
    answer: '',
    userType: 'BOOK_MANAGER',
    bookHistory: [],
    salt: '',
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe97',
    firstname: 'Book',
    lastname: 'Manager',
    username: 'username',
    password: '',
    email: 'bookmanager@email.com',
    idNumber: '12312312',
    question: '',
    answer: '',
    userType: 'BOOK_MANAGER',
    bookHistory: [],
    salt: '',
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe97',
    firstname: 'Book',
    lastname: 'Manager',
    username: 'username',
    password: '',
    email: 'bookmanager@email.com',
    idNumber: '12312312',
    question: '',
    answer: '',
    userType: 'BOOK_MANAGER',
    bookHistory: [],
    salt: '',
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe97',
    firstname: 'Book',
    lastname: 'Manager',
    username: 'username',
    password: '',
    email: 'bookmanager@email.com',
    idNumber: '12312312',
    question: '',
    answer: '',
    userType: 'BOOK_MANAGER',
    bookHistory: [],
    salt: '',
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe97',
    firstname: 'Book',
    lastname: 'Manager',
    username: 'username',
    password: '',
    email: 'bookmanager@email.com',
    idNumber: '12312312',
    question: '',
    answer: '',
    userType: 'BOOK_MANAGER',
    bookHistory: [],
    salt: '',
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe97',
    firstname: 'Book',
    lastname: 'Manager',
    username: 'username',
    password: '',
    email: 'bookmanager@email.com',
    idNumber: '12312312',
    question: '',
    answer: '',
    userType: 'BOOK_MANAGER',
    bookHistory: [],
    salt: '',
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe97',
    firstname: 'Book',
    lastname: 'Manager',
    username: 'username',
    password: '',
    email: 'bookmanager@email.com',
    idNumber: '12312312',
    question: '',
    answer: '',
    userType: 'BOOK_MANAGER',
    bookHistory: [],
    salt: '',
    __v: 0,
  },
  {
    _id: '5e7a1857e7c0e02d7844fe97',
    firstname: 'Book',
    lastname: 'Manager',
    username: 'username',
    password: '',
    email: 'bookmanager@email.com',
    idNumber: '12312312',
    question: '',
    answer: '',
    userType: 'BOOK_MANAGER',
    bookHistory: [],
    salt: '',
    __v: 0,
  },
];

const Page = () => {
  const columns = [
    {
      title: 'ID Number',
      dataIndex: 'idNumber',
      key: 'idNumber',
      width: 150,
    },
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      width: 100,
      key: 'action',
      render: record => (
        <Row type="flex" justify="space-between">
          <ViewModal user={record} />
          <AddEditModal
            command="Edit"
            user={record}
            handleUpdate={handleUpdate}
          />
          <DeleteModal user={record} handleDelete={handleDelete} />
        </Row>
      ),
    },
  ];

  const handleAdd = account => {
    // call to back end and pass the account to add
  };

  const handleUpdate = account => {
    // call to back end and pass the account to update
  };

  const handleDelete = accountID => {
    // call to back end passing the accountID to delete
  };

  return (
    <>
      <Jumbotron bsPrefix="page-header" fluid>
        <Container className="inner-container">
          <h1 style={{color: '#6c63ff'}}>Book Manangers</h1>
          <p>
            Manage the book managers of your online library. You can add, edit,
            and delete book managers!
          </p>
        </Container>
      </Jumbotron>

      <div className="content-container">
        <div className="header-wrapper">
          <AddEditModal command="Add" handleAdd={handleAdd} />
        </div>

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
