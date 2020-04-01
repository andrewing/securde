import React from 'react';
import {Container, Jumbotron, Button} from 'react-bootstrap';
import {Table} from 'antd';
import bookColumns from '../../components/Table/booksColumns';
import bookData from '../../components/Table/bookData';

const Page = () => {
  const viewBook = () => {
    console.log('view book');
  };

  const editBook = () => {
    console.log('edit');
  };
  const deleteBook = () => {
    console.log('delete');
  };

  return (
    <>
      <Jumbotron bsPrefix="page-header" fluid>
        <Container>
          <h1 style={{color: '#6c63ff'}}>All Books</h1>
          <p>
            Manage the books you created. You can add, edit, and delete books!
          </p>
        </Container>
      </Jumbotron>
      <div className="page-content">
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '10px 0',
          }}
        >
          <Button bsPrefix="primary-button">Add Book</Button>
        </div>
        <Table
          bordered
          dataSource={bookData}
          columns={bookColumns({viewBook, editBook, deleteBook})}
        />
      </div>
    </>
  );
};

export default Page;
