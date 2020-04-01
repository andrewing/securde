import React, {useState} from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import {Table, notification} from 'antd';
import {CheckCircleTwoTone} from '@ant-design/icons';
import bookColumns from '../../components/table/booksColumns';
import bookData from '../../components/table/bookData';
import AddEditBookModal from '../../components/modals/AddEditBook';

const Page = () => {
  const [showAddBook, setShowAddBook] = useState(false);
  const [selectedAction, setSelectedAction] = useState('add');
  const [tableData, setTableData] = useState();

  const showAddModal = () => {
    setSelectedAction('add');
    setShowAddBook(true);
    setTableData();
  };

  const showEditModal = data => {
    setSelectedAction('edit');
    setShowAddBook(true);
    setTableData(data);
  };

  const deleteBook = data => {
    console.log(data);
  };

  const onCreateBook = values => {
    notification.open({
      icon: <CheckCircleTwoTone twoToneColor="#52C41A" />,
      message: 'Successfully added a book!',
      description: 'The book is automatically added in the table.',
    });
    console.log(values);
  };

  const onEditBook = values => {
    notification.open({
      icon: <CheckCircleTwoTone twoToneColor="#52C41A" />,
      message: 'Successfully edited a book!',
      description: 'The book is automatically added in the table.',
    });
    console.log(values);
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
          <Button bsPrefix="primary-button" onClick={showAddModal}>
            Add Book
          </Button>
        </div>
        <Table
          bordered
          dataSource={bookData}
          columns={bookColumns({showEditModal, deleteBook})}
        />
      </div>

      <AddEditBookModal
        showAddBook={showAddBook}
        handleClose={handleClose}
        action={selectedAction}
        data={tableData}
        onCreateBook={onCreateBook}
        onEditBook={onEditBook}
      />
    </>
  );
};

export default Page;
