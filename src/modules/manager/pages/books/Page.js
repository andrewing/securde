import React, {useState, useRef, useEffect} from 'react';
import {Jumbotron} from 'react-bootstrap';
import {Table, Button, notification} from 'antd';
import {CheckCircleTwoTone} from '@ant-design/icons';
import bookColumns from '../../components/table/booksColumns';
import AddEditBookModal from '../../components/modals/AddEditBook';
import {getBookPaginated} from '../../../../api/book';

const Page = ({setNotification, props}) => {
  const [showAddBook, setShowAddBook] = useState(false);
  const [selectedAction, setSelectedAction] = useState('add');
  const [tableData, setTableData] = useState();

  const [currPage, setPage] = useState(1);
  const [meta, setMeta] = useState({});

  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    getBookPaginated(currPage, 10)
      .then(res => {
        const {data} = res;
        const {res: books, meta: m} = data;
        setBookData(books);
        setMeta(m);
      })
      .catch(err => {
        setNotification(err);
      });
  }, [currPage]);

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
    // console.log(data);
  };

  const onCreateBook = values => {
    notification.open({
      icon: <CheckCircleTwoTone twoToneColor="#52C41A" />,
      message: 'Successfully added a book!',
      description: 'The book is automatically added in the table.',
    });
    // console.log(values);
  };

  const onEditBook = values => {
    notification.open({
      icon: <CheckCircleTwoTone twoToneColor="#52C41A" />,
      message: 'Successfully edited a book!',
      description: 'The book is automatically added in the table.',
    });
    // console.log(values);
  };

  const handleClose = () => {
    setShowAddBook(false);
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
          <Button
            style={{background: '#6C63FF', color: 'white'}}
            onClick={showAddModal}
          >
            Add Book
          </Button>
        </div>
        <Table
          bordered
          dataSource={bookData}
          rowKey={data => data._id}
          columns={bookColumns({
            props,
            showEditModal,
            deleteBook,
            handleSearch,
            handleReset,
            searchText,
            searchColumn,
            searchInput,
          })}
          pagination={{
            onChange: setPage,
            defaultCurrent: 1,
            defaultPageSize: 10,
            total: meta.total || 0,
          }}
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
