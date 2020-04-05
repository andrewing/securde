import React from 'react';
import {Tabs, List, Table} from 'antd';
import reviewsData from './reviewsData';
import borrowedBooksColumns from './table/borrowedBooksColumns';
import borrowedBookData from './table/borrowedBookData';

const PostedReviews = () => {
  return (
    <div
      style={{
        border: '1px solid #EFEFEF',
        marginBottom: 20,
        padding: 10,
        height: 500,
        width: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={reviewsData}
        renderItem={(item, i) => (
          <List.Item>
            <List.Item.Meta
              title="Title of the reviewed book"
              description={item}
            />
          </List.Item>
        )}
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
          />
        </TabPane>
        <TabPane tab="Posted Reviews" key="2">
          <PostedReviews />
        </TabPane>
      </Tabs>
    </>
  );
};

export default UserLogs;
