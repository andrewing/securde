import React, {useEffect, useState, useRef} from 'react';
import {Jumbotron} from 'react-bootstrap';
import {Table} from 'antd';
import bookColumns from '../../components/table/booksColumns';
import BorrowBookModal from '../../components/modals/BorrowBookModal';
import {getBookPaginated} from '../../../../api/book/index';

const Page = ({props}) => {
  const {setNotification} = props;
  const [selectedBook, setSelectedBook] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [allBooks, setAllBooks] = useState();
  const [currPage, setPage] = useState(1);
  const [metaTotal, setMetaTotal] = useState();

  useEffect(() => {
    getBookPaginated(currPage, 10).then(res => {
      const {data} = res;
      setAllBooks(data.res);
      setMetaTotal(data.meta.total);
      setLoading(false);
    });
  }, [currPage]);

  const showBorrowBook = record => {
    setShowModal(true);
    setSelectedBook(record);
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
    setLoading(false);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
    setLoading(false);
  };

  const handlePage = page => {
    setLoading(true);
    setPage(page);
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
          rowKey={record => record._id}
          dataSource={allBooks}
          columns={bookColumns({
            currPage,
            props,
            showBorrowBook,
            handleSearch,
            handleReset,
            searchText,
            searchColumn,
            searchInput,
          })}
          loading={isLoading}
          pagination={{
            onChange: handlePage,
            defaultCurrent: 1,
            defaultPageSize: 10,
            total: metaTotal,
          }}
        />
      </div>
      <BorrowBookModal
        selectedBook={selectedBook}
        showModal={showModal}
        handleClose={handleClose}
        setNotification={setNotification}
      />
    </>
  );
};

export default Page;
