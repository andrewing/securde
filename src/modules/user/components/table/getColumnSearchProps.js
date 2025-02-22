import React from 'react';
import {Button, Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const getColumnSearchProps = (
  dataIndex,
  searchInput,
  handleSearch,
  handleReset,
  searchColumn,
  searchText,
) => ({
  filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
    <div style={{padding: 8}}>
      <Input
        ref={node => {
          searchInput.current = node;
        }}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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

export default getColumnSearchProps;
