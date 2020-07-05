/* eslint-disable react/destructuring-assignment */
import React, {useState, useRef, useEffect} from 'react';
import {Table, Row, Button} from 'antd';
import {Jumbotron, Container} from 'react-bootstrap';
import {BeatLoader} from 'react-spinners';
import BookInfo from '../../components/BookInfo';
import EditInstance from '../../components/modals/EditInstance';
import bookInstancesColumns from '../../components/table/bookInstanceColumns';
import {
  getBookInstanceByBook,
  createBookInstance,
  deleteBookInstance,
} from '../../../../api/bookInstance';

const ViewBook = ({setNotification, props}) => {
  const {state} = props.location;
  const [editVisible, setEditVisible] = useState(false);
  const [selectedAction] = useState('add');
  const [selectedData, setSelectedData] = useState();
  const [bookInstanceData, setBookInstanceData] = useState([]);
  const [currPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  // for filters
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('');
  const searchInput = useRef();

  useEffect(() => {
    getBookInstanceByBook(state.id)
      .then(res => {
        const {bookInstances} = res.data;
        setBookInstanceData(bookInstances);
      })
      .catch(err => {
        setNotification(err);
      });
    // eslint-disable-next-line
  }, [currPage, isLoading]);

  const addBookInstance = () => {
    setLoading(true);
    createBookInstance({bookId: state.id})
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

  const showEditModal = data => {
    setSelectedData(data);
    setEditVisible(true);
  };

  const deleteBook = data => {
    setLoading(true);
    deleteBookInstance({id: data._id})
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
    setEditVisible(false);
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
        <h1 style={{paddingLeft: 130, margin: '15px 0'}}>Copies</h1>
        <Button
          style={{
            background: '#6C63FF',
            color: 'white',
            margin: 15,
            marginRight: 150,
          }}
          onClick={addBookInstance}
        >
          {isLoading ? <BeatLoader size="8" color="white" /> : 'Add a copy'}
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
          loading={isLoading}
        />
      </Container>

      <EditInstance
        editVisible={editVisible}
        handleClose={handleClose}
        action={selectedAction}
        data={selectedData || {}}
        setNotification={setNotification}
        setLoading={setLoading}
        isLoading={isLoading}
      />
    </>
  );
};

export default ViewBook;
