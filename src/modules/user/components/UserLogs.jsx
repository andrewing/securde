import React, {useEffect, useState} from 'react';
import {Tabs, List, Table} from 'antd';
import borrowedBooksColumns from './table/borrowedBooksColumns';
import borrowedBookData from './table/borrowedBookData';
import {
  getReviewHistory,
  getBookHistory,
} from '../../../api/user/history/index';

const PostedReviews = ({reviewHistory}) => {
  return (
    <div
      style={{
        border: '1px solid #EFEFEF',
        marginBottom: 20,
        padding: 10,
        maxHeight: 500,
        width: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={reviewHistory}
        renderItem={item => {
          const {title} = item.book;

          return (
            <List.Item>
              <List.Item.Meta title={title} description={item.content} />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

const BorrowedBooks = ({
  searchText,
  searchColumn,
  searchInput,
  handleSearch,
  handleReset,
  bookHistory,
}) => {
  return (
    <Table
      bordered
      dataSource={borrowedBookData}
      columns={borrowedBooksColumns({
        handleSearch,
        handleReset,
        searchText,
        searchColumn,
        searchInput,
      })}
    />
  );
};

const UserLogs = ({
  searchText,
  searchColumn,
  searchInput,
  handleSearch,
  handleReset,
}) => {
  const {TabPane} = Tabs;
  const [reviewHistory, setReviewHistory] = useState([]);
  const [bookHistory, setBookHistory] = useState([]);

  useEffect(() => {
    getReviewHistory().then(res => {
      const {data} = res;
      setReviewHistory(data.reviewHistory);
    });
  }, []);

  useEffect(() => {
    getBookHistory().then(res => {
      const {data} = res;
      setBookHistory(data);
      // console.log(res);
    });
  }, []);

  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Borrowed Books" key="1">
          <BorrowedBooks
            searchText={searchText}
            searchColumn={searchColumn}
            searchInput={searchInput}
            handleSearch={handleSearch}
            handleReset={handleReset}
            bookHistory={bookHistory}
          />
        </TabPane>
        <TabPane tab="Posted Reviews" key="2">
          <PostedReviews reviewHistory={reviewHistory} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default UserLogs;
