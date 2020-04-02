import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {Button, Input, Row, Table} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import AddEditModal from './AddEditModal';
import DeleteModal from './DeleteModal';
import ViewModal from './ViewModal';

const BookManagerList = prop => {
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('');
  const searchInput = useRef();

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

  const handleAdd = account => {
    // call to back end and pass the account to add
  };

  const handleUpdate = account => {
    // call to back end and pass the account to update
  };

  const handleDelete = accountID => {
    // call to back end passing the accountID to delete
  };

  const columns = [
    {
      title: 'ID Number',
      className: 'column-style',
      dataIndex: 'idNumber',
      key: 'idNumber',
      width: 150,
      ...getColumnSearchProps('ID number'),
    },
    {
      title: 'First Name',
      className: 'column-style',
      dataIndex: 'firstname',
      key: 'firstname',
      ...getColumnSearchProps('first name'),
    },
    {
      title: 'Last Name',
      className: 'column-style',
      dataIndex: 'lastname',
      key: 'lastname',
      ...getColumnSearchProps('last name'),
    },
    {
      title: 'Username',
      className: 'column-style',
      dataIndex: 'username',
      key: 'username',
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Email Address',
      className: 'column-style',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email address'),
    },
    {
      title: 'Action',
      className: 'column-style',
      width: 100,
      key: 'action',
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
        columns={columns}
        dataSource={prop.data}
        bordered
        pagination={{position: ['bottomCenter', 'bottomCenter']}}
      />
    </>
  );
};

BookManagerList.propType = {
  data: PropTypes.array.isRequired,
};

export default BookManagerList;
