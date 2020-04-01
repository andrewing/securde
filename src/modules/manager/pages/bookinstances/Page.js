import React, {useState} from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import {Table, notification} from 'antd';
import {CheckCircleTwoTone} from '@ant-design/icons';
import bookInstancesColumns from '../../components/table/bookInstanceColumns';
import bookInstanceData from '../../components/table/bookInstanceData';
import AddEditInstance from '../../components/modals/AddEditInstance';

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
        <h1 style={{color: '#6C4CC5'}}>All Book Instances</h1>
        <p>
          Manage the book instances you created. You can add, edit, and delete
          book instances!
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
          dataSource={bookInstanceData}
          columns={bookInstancesColumns({showEditModal, deleteBook})}
        />
      </div>

      <AddEditInstance
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
