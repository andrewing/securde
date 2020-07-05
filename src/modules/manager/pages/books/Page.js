import React, {useState, useRef, useEffect} from 'react';
import {Jumbotron} from 'react-bootstrap';
import {BeatLoader} from 'react-spinners';
import {Table, Button} from 'antd';
import bookColumns from '../../components/Table/booksColumns';
import AddEditBookModal from '../../components/modals/AddEditBook';
import {
  getBookPaginated,
  createBook,
  updateBook,
  deleteBook as removeBook,
} from '../../../../api/book';

const Page = ({setNotification, props}) => {
  const [showAddBook, setShowAddBook] = useState(false);
  const [selectedAction, setSelectedAction] = useState('add');
  const [tableData, setTableData] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isGettingLoading, setGettingLoading] = useState(false);

  const [currPage, setPage] = useState(1);
  const [meta, setMeta] = useState({});

  const [bookData, setBookData] = useState([]);

  // for filters
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('');
  const searchInput = useRef();

  useEffect(() => {
    setGettingLoading(true);
    getBookPaginated(
      currPage,
      10,
      searchColumn.length ? `&${searchColumn}=${searchText}` : '',
    )
      .then(res => {
        const {data} = res;
        const {res: books, meta: m} = data;
        setBookData(books);
        setMeta(m);
      })
      .catch(err => {
        setNotification(err);
      })
      .finally(() => {
        setGettingLoading(false);
      });
    // eslint-disable-next-line
  }, [currPage, isLoading, searchText, searchColumn]);

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
    setLoading(true);
    removeBook({id: data._id})
      .then(res => {
        setNotification(res);
      })
      .catch(err => {
        setNotification(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onCreateBook = values => {
    setLoading(true);
    createBook(values)
      .then(res => {
        setNotification(res);
      })
      .catch(err => {
        setNotification(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onEditBook = values => {
    setLoading(true);
    updateBook(values, tableData._id)
      .then(res => {
        setNotification(res);
      })
      .catch(err => {
        setNotification(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClose = () => {
    setShowAddBook(false);
  };

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
            {isLoading ? <BeatLoader size={8} color="white" /> : 'Add Book'}
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
          loading={isGettingLoading}
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
