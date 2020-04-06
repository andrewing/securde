import React, {useState, useRef, useEffect} from 'react';
import Highlighter from 'react-highlight-words';
import {Button, Input, Table} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {getSystemLogs} from '../../../api/admin/index';

const SystemLogList = () => {
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('');
  const [logsData, setLogsData] = useState([]);
  const searchInput = useRef();

  useEffect(() => {
    getSystemLogs().then(res => {
      const {data} = res;
      setLogsData(data.logs);
    });
  }, []);

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
          Reset
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

  const columns = [
    {
      title: 'Date/Time',
      className: 'column-style',
      dataIndex: 'time',
    },
    {
      title: 'Action',
      className: 'column-style',
      dataIndex: 'action',
      ...getColumnSearchProps('action'),
    },
    // {
    //   title: 'Username',
    //   className: 'column-style',
    //   dataIndex: 'account',
    //   ...getColumnSearchProps('username'),
    // },
    {
      title: 'Logs',
      className: 'column-style',
      dataIndex: 'content',
      ...getColumnSearchProps('log'),
    },
  ];

  return (
    <>
      <Table
        rowKey={record => {
          return record._id;
        }}
        columns={columns}
        dataSource={logsData}
        bordered
        pagination={{position: ['bottomCenter', 'bottomCenter']}}
      />
    </>
  );
};

export default SystemLogList;
