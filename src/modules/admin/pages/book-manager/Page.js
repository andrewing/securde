import React, { Component } from 'react';
import { Button, Table } from 'antd'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddEditModal from '../../components/AddEditModal';
import DeleteModal from '../../components/DeleteModal';

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

export default class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRow: {}
    }

    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSelectedRow = this.handleSelectedRow.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

    this.columns = [
      {
        title: 'ID Number',
        dataIndex: 'idNumber',
        key: 'idNumber',
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
        key: 'username'
      },
      {
        title: 'Email Address',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: 'Action',
        key: 'action',
        render: (record) => (
          <div className='button-wrapper-table'>
            <AddEditModal command="Edit" user={record} handleUpdate={this.handleUpdate} />
            <DeleteModal user={record} handleDelete={this.handleDelete} />
          </div>
        )
      }
    ]
  }

  handleAdd = account => {
    // call to back end and pass the account to add
  };

  handleUpdate = account => {
    // call to back end and pass the account to update
  };

  handleDelete = accountID => {
    // call to back end passing the accountID to delete
  };

  handleSelectedRow = (object, index) => {
    this.setState({
      selectedRow: data[index]
    })
  }

  render() {
    return (
      <>
        <div className="header-wrapper">
          <h2>Book Managers</h2>
          <AddEditModal command="Add" handleAdd={this.handleAdd} />
        </div>
  
        <Table 
          columns={this.columns} 
          dataSource={data} 
          bordered 
          pagination={{ position: ['bottomCenter', 'bottomCenter'] }} />
        
      </>
    );
  }
};
