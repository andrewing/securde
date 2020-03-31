import React from 'react';
import {Container, Jumbotron} from 'react-bootstrap';
import {Table} from 'antd';
import bookColumns from '../../components/Table/booksColumns';
import bookData from '../../components/Table/bookData';

const Page = () => {
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
          <h1>Books</h1>
          <p>Manage the books you created!</p>
        </Container>
      </Jumbotron>
      <div className="page-content">
        <Table
          bordered
          dataSource={bookData}
          columns={bookColumns({editBook, deleteBook})}
        />
      </div>
    </>
  );
};

export default Page;
