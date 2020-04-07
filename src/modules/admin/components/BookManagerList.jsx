import React, {useState, useRef, useEffect} from 'react';
import {Button, Input, Pagination, Row, Table} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {useDispatch} from 'react-redux';
import AddEditModal from './AddEditModal';
import DeleteModal from './DeleteModal';
import ViewModal from './ViewModal';
import {createManager, getAccountsPaginated} from '../../../api/admin/index';
import {AUDIENCE} from '../../../util/constants';
import {actions} from '../../../redux/notification';

const BookManagerList = () => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('');
  const [dataPerPage, setDataPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookManagerData, setBookManagerData] = useState([]);
  const dispatch = useDispatch();
  const searchInput = useRef();

  const setNotification = ({isSuccess, message}) => {
    dispatch(actions.setNotification({isSuccess, message}));
  };

  useEffect(() => {
    getAccountsPaginated(currentPage, dataPerPage, AUDIENCE.BOOK_MANAGER).then(
      res => {
        const {data} = res;
        setBookManagerData(data.accounts);
        setTotal(data.meta.total);
        setLoadingTable(false);
      },
    );
  }, [currentPage, dataPerPage]);

  const handleChangePage = page => {
    setLoadingTable(true);
    setCurrentPage(page);
  };

  const handleChangePageSize = (current, size) => {
    setLoadingTable(true);
    setDataPerPage(size);
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{padding: 8}}>
        <Input
          ref={node => {
            searchInput.current = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{width: 188, marginBottom: 8, display: 'block'}}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{width: 90, marginRight: 8}}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{width: 90}}
        >
          Clear
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.select());
      }
    },
    render: text =>
      searchColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const handleAdd = values => {
    // call to back end and pass the account to add
    values = {...values};

    createManager(values).then(res => {
      setNotification(res);
    });
  };

  const handleUpdate = values => {
    // call to back end and pass the account to update
  };

  const handleDelete = values => {
    // call to back end passing the accountID to delete
  };

  const columns = [
    {
      title: 'ID Number',
      className: 'column-style',
      dataIndex: 'idNumber',
      width: 150,
      ...getColumnSearchProps('ID number'),
    },
    {
      title: 'First Name',
      className: 'column-style',
      dataIndex: 'firstname',
      ...getColumnSearchProps('first name'),
    },
    {
      title: 'Last Name',
      className: 'column-style',
      dataIndex: 'lastname',
      ...getColumnSearchProps('last name'),
    },
    {
      title: 'Username',
      className: 'column-style',
      dataIndex: 'username',
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Email Address',
      className: 'column-style',
      dataIndex: 'email',
      ...getColumnSearchProps('email address'),
    },
    {
      title: 'Action',
      className: 'column-style',
      width: 100,
      render: record => (
        <Row type="flex" justify="space-around">
          <ViewModal user={record} />
          <AddEditModal
            command="Edit"
            user={record}
            handleUpdate={handleUpdate}
          />
          <DeleteModal user={record} handleDelete={handleDelete} />
        </Row>
      ),
    },
  ];

  return (
    <>
      <div className="header-wrapper">
        <AddEditModal command="Add" handleAdd={handleAdd} />
      </div>

      <Table
        rowKey={record => {
          return record._id;
        }}
        columns={columns}
        dataSource={bookManagerData}
        bordered
        loading={loadingTable}
        pagination={false}
      />

      <div className="paginate-table">
        <Pagination
          defaultCurrent={currentPage}
          total={total}
          pageSize={dataPerPage}
          onChange={handleChangePage}
          onShowSizeChange={handleChangePageSize}
        />
      </div>
    </>
  );
};

export default BookManagerList;
