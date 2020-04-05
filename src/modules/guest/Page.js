import React, {useState, useRef} from 'react';
import {useRouteMatch} from 'react-router-dom';
import {Jumbotron} from 'react-bootstrap';
import {Table} from 'antd';
import GuestNav from './components/GuestNav';
import bookColumns from './components/table/booksColumns';
import bookData from './components/table/bookData';

const Page = () => {
  const {url} = useRouteMatch();
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
      <GuestNav url={url} />
      <Jumbotron bsPrefix="page-header" fluid>
        <h1 style={{color: '#6C4CC5'}}>All Books</h1>
        <p>View the list of books that you can borrow online!</p>
      </Jumbotron>
      <div className="page-content">
        <Table
          bordered
          dataSource={bookData}
          columns={bookColumns({
            handleSearch,
            handleReset,
            searchText,
            searchColumn,
            searchInput,
          })}
        />
      </div>
    </>
  );
};

export default Page;
