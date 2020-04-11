import React, {useState, useRef, useEffect} from 'react';
import {useRouteMatch} from 'react-router-dom';
import {Jumbotron} from 'react-bootstrap';
import {Table} from 'antd';
import GuestNav from './components/GuestNav';
import bookColumns from './components/table/booksColumns';
import {getBookPaginated} from '../../api/book/index';

const Page = () => {
  const {url} = useRouteMatch();
  // for filters
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('');
  const searchInput = useRef();
  const [isLoading, setLoading] = useState(true);
  const [allBooks, setAllBooks] = useState();
  const [currPage, setPage] = useState(1);
  const [metaTotal, setMetaTotal] = useState();

  useEffect(() => {
    getBookPaginated(
      currPage,
      10,
      searchColumn.length ? `&${searchColumn}=${searchText}` : '',
    ).then(res => {
      const {data} = res;
      setAllBooks(data.res);
      setMetaTotal(data.meta.total);
      setLoading(false);
    });
  }, [currPage, searchText, searchColumn]);

  const handlePage = page => {
    setLoading(true);
    setPage(page);
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
      <GuestNav url={url} />
      <Jumbotron bsPrefix="page-header" fluid>
        <h1 style={{color: '#6C4CC5'}}>All Books</h1>
        <p>View the list of books that you can borrow online!</p>
      </Jumbotron>
      <div className="page-content">
        <Table
          bordered
          dataSource={allBooks}
          columns={bookColumns({
            handleSearch,
            handleReset,
            searchText,
            searchColumn,
            searchInput,
          })}
          loading={isLoading}
          pagination={{
            onChange: handlePage,
            defaultCurrent: 1,
            defaultPageSize: 10,
            total: metaTotal,
          }}
        />
      </div>
    </>
  );
};

export default Page;
