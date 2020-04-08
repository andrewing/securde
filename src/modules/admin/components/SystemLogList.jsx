import React, {useState, useRef, useEffect} from 'react';
import Highlighter from 'react-highlight-words';
import {Button, Input, Table} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import moment from 'moment';
import {getSystemLogsPaginated} from '../../../api/admin/index';

const SystemLogList = () => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('');
  const [dataPerPage, setDataPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsData, setLogsData] = useState([]);
  const searchInput = useRef();

  useEffect(() => {
    getSystemLogsPaginated(currentPage, dataPerPage).then(res => {
      const {data} = res;
      setLogsData(data.res);
      setTotal(data.meta.total);
      setLoadingTable(false);
    });
  }, [currentPage, dataPerPage]);

  const handleChangePage = page => {
    setLoadingTable(true);
    setCurrentPage(page);
  };

  const handleChangePageSize = (current, size) => {
    setLoadingTable(true);
    setDataPerPage(size);
  };

  const getColumnSearchProps = (dataIndex, placeholder) => ({
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
          placeholder={`Search ${placeholder}`}
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
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}} />
    ),
    onFilter: (value, record) => {
      if (dataIndex === 'account') {
        if (record[dataIndex] !== null) {
          return record[dataIndex].username
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        }
        return false;
      }
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    },
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
          textToHighlight={
            dataIndex === 'account' && text !== null
              ? text.username.toString()
              : text.toString()
          }
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

  const columns = [
    {
      title: 'Date/Time',
      className: 'column-style',
      dataIndex: 'time',
      width: 200,
      render: time => <span>{moment(time).format('YYYY-MM-DD HH:mm')}</span>,
    },
    {
      title: 'Action',
      className: 'column-style',
      dataIndex: 'action',
      width: 200,
      ...getColumnSearchProps('action', 'action'),
    },
    {
      title: 'Username',
      className: 'column-style',
      dataIndex: 'account',
      width: 200,
      ...getColumnSearchProps('account', 'username'),
      render: account =>
        account === null ? <span>NONE</span> : <span>{account.username}</span>,
    },
    {
      title: 'Logs',
      className: 'column-style',
      dataIndex: 'content',
      ...getColumnSearchProps('content', 'logs'),
    },
  ];

  return (
    <>
      <Table
        rowKey={record => record._id}
        columns={columns}
        dataSource={logsData}
        bordered
        loading={loadingTable}
        pagination={{
          position: ['bottomCenter', 'bottomCenter'],
          onChange: handleChangePage,
          onShowSizeChange: handleChangePageSize,
          defaultCurrent: currentPage,
          total,
          defaultPageSize: dataPerPage,
        }}
      />
    </>
  );
};

export default SystemLogList;
