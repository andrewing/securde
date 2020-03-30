import React from 'react';
import {Button, Container, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
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
  const handleAdd = account => {
    // call to back end and pass the account to add
  };

  const handleUpdate = account => {
    // call to back end and pass the account to update
  };

  const handleDelete = accountID => {
    // call to back end passing the accountID to delete
  };

  const bookManagerList = () => {
    // back end call to get all book managers

    return data.map((value, index) => {
      return (
        <tr key={value._id}>
          <td className="table-cell">{value.idNumber}</td>
          <td className="table-cell">{value.firstname}</td>
          <td className="table-cell">{value.lastname}</td>
          <td className="table-cell">{value.username}</td>
          <td className="table-cell">{value.email}</td>
          <td className="table-cell">
            <div>
              <AddEditModal
                command="Edit"
                user={value}
                handleUpdate={handleUpdate}
              />
              <DeleteModal user={value} handleDelete={handleDelete} />
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <div className="header-wrapper">
        <h2>Book Managers</h2>
        <AddEditModal command="Add" handleAdd={handleAdd} />
      </div>

      <Container className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="table-cell">ID Number</th>
              <th className="table-cell">First Name</th>
              <th className="table-cell">Last Name</th>
              <th className="table-cell">Username</th>
              <th className="table-cell">Email Address</th>
              <th className="table-cell">Action</th>
            </tr>
          </thead>
          <tbody>{bookManagerList()}</tbody>
        </Table>
      </Container>
    </>
  );
};

export default Page;
