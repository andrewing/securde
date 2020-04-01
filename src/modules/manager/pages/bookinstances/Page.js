import React from 'react';
import {Container, Jumbotron, Button} from 'react-bootstrap';
import {Table} from 'antd';
import bookInstancesColumns from '../../components/table/bookInstanceColumns';
import bookInstancesData from '../../components/table/bookInstanceData';

const Page = () => {
  const viewBook = data => {
    console.log(data);
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
          <h1 style={{color: '#6C4CC5'}}>All Book Instances</h1>
          <p>
            Manage the book instances you created. You can add, edit, and delete
            book instances!
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
          dataSource={bookInstancesData}
          columns={bookInstancesColumns({viewBook, editBook, deleteBook})}
        />
      </div>
    </>
  );
};

export default Page;
