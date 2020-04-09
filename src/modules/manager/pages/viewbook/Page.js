/* eslint-disable react/destructuring-assignment */
import React, {useState, useRef, useEffect} from 'react';
import {Table, notification, Row, Button} from 'antd';
import {CheckCircleTwoTone} from '@ant-design/icons';
import {Jumbotron, Container} from 'react-bootstrap';
import BookInfo from '../../components/BookInfo';
import AddEditInstance from '../../components/modals/AddEditInstance';
import bookInstancesColumns from '../../components/table/bookInstanceColumns';
import {getBookInstanceByBook} from '../../../../api/bookInstance';

const ViewBook = ({setNotification, props}) => {
  const {state} = props.location;
  const [showAddBook, setShowAddBook] = useState(false);
  const [selectedAction, setSelectedAction] = useState('add');
  const [selectedData, setSelectedData] = useState();
  const [bookInstanceData, setBookInstanceData] = useState([]);
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    getBookInstanceByBook(state.id)
      .then(res => {
        const {bookInstances} = res.data;
        setBookInstanceData(bookInstances);
      })
      .catch(err => {
        setNotification(err);
      });
  }, [currPage]);

  const showAddModal = () => {
    setSelectedAction('add');
    setShowAddBook(true);
    setSelectedData();
  };

  const showEditModal = data => {
    setSelectedAction('edit');
    setShowAddBook(true);
    setSelectedData(data);
  };

  const deleteBook = data => {
    // console.log(data);
  };

  const onCreateInstance = values => {
    // console.log(values);

    notification.open({
      icon: <CheckCircleTwoTone twoToneColor="#52C41A" />,
      message: 'Successfully added a book instance!',
      description: 'The book instance is automatically added in the table.',
    });
  };

  const onEditInstance = values => {
    // console.log(values);

    notification.open({
      icon: <CheckCircleTwoTone twoToneColor="#52C41A" />,
      message: 'Successfully edited a book instance!',
      description: 'The book will be automatically updated in the table.',
    });
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
        <div style={{paddingLeft: 70}}>
          <h1>{state.title}</h1>
          <div title={state.author}>
            <span>Authored By </span>
            {state.author.map((item, i) => {
              if (i === state.author.length - 1) {
                return <span key={i}> {item} </span>;
              }
              return <span key={i}>{item}, </span>;
            })}
          </div>
        </div>
      </Jumbotron>
      <br />
      <BookInfo state={state} />

      <Row type="flex" justify="space-between">
        <h1 style={{paddingLeft: 130, margin: '15px 0'}}>Book Instances</h1>
        <Button
          style={{
            background: '#6C63FF',
            color: 'white',
            margin: 15,
            marginRight: 150,
          }}
          onClick={showAddModal}
        >
          Add Book Instance
        </Button>
      </Row>
      <Container>
        <Table
          bordered
          dataSource={bookInstanceData}
          columns={bookInstancesColumns({
            showEditModal,
            deleteBook,
            handleSearch,
            handleReset,
            searchText,
            searchColumn,
            searchInput,
          })}
        />
      </Container>
      <AddEditInstance
        showAddBook={showAddBook}
        handleClose={handleClose}
        action={selectedAction}
        data={selectedData}
        onCreateBook={onCreateInstance}
        onEditBook={onEditInstance}
      />
    </>
  );
};

export default ViewBook;
