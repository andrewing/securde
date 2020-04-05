import React, {useState, useRef} from 'react';
import {Jumbotron} from 'react-bootstrap';
import {Table, notification} from 'antd';
import {CheckCircleTwoTone} from '@ant-design/icons';
import bookColumns from '../../components/table/booksColumns';
import bookData from '../../components/table/bookData';
import BorrowBookModal from '../../components/modals/BorrowBookModal';

const Page = ({props}) => {
  const [selectedBook, setSelectedBook] = useState();
  const [showModal, setShowModal] = useState(false); // showBorrow will go to borrow modal

  const showBorrowBook = record => {
    setShowModal(true);
    setSelectedBook(record);
  };

  const borrowBook = values => {
    // console.log(selectedBook, values);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  // for filters
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('');
  const searchInput = useRef();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  return (
    <>
      <Jumbotron bsPrefix="page-header" fluid>
        <h1 style={{color: '#6C4CC5'}}>All Books</h1>
        <p>View the list of books that you can borrow online!</p>
      </Jumbotron>
      <div className="page-content">
        <Table
          bordered
          dataSource={bookData}
          columns={bookColumns({
            props,
            showBorrowBook,
            handleSearch,
            handleReset,
            searchText,
            searchColumn,
            searchInput,
          })}
        />
      </div>
      <BorrowBookModal
        data={selectedBook}
        showModal={showModal}
        borrowBook={borrowBook}
        handleClose={handleClose}
      />
    </>
  );
};

export default Page;
