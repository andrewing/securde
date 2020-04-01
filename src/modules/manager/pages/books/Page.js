import React, {useState} from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import {Table} from 'antd';
import bookColumns from '../../components/table/booksColumns';
import bookData from '../../components/table/bookData';
import AddBookModal from '../../components/modals/AddBookModal';

const Page = () => {
  const [showAddBook, setShowAddBook] = useState(false);
  const viewBook = data => {
    console.log(data);
  };

  const editBook = data => {
    console.log(data);
  };

  const deleteBook = data => {
    console.log(data);
  };

  const addBook = () => {
    setShowAddBook(true);
  };

  const handleClose = () => {
    setShowAddBook(false);
  };

  return (
    <>
      <Jumbotron bsPrefix="page-header" fluid>
        <h1 style={{color: '#6C4CC5'}}>All Books</h1>
        <p>
          Manage the books you created. You can add, edit, and delete books!
        </p>
      </Jumbotron>
      <div className="page-content">
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '10px 0',
          }}
        >
          <Button bsPrefix="primary-button" onClick={addBook}>
            Add Book
          </Button>
        </div>
        <Table
          bordered
          dataSource={bookData}
          columns={bookColumns({viewBook, editBook, deleteBook})}
        />
      </div>

      <AddBookModal showAddBook={showAddBook} handleClose={handleClose} />
    </>
  );
};

export default Page;
