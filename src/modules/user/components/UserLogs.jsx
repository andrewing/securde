import React, {useEffect, useState} from 'react';
import {Tabs, List, Table} from 'antd';
import moment from 'moment';
import borrowedBooksColumns from './table/borrowedBooksColumns';
import {returnBookInstance} from '../../../api/bookInstance/index';
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
  isLoading,
  returnBook,
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
      loading={isLoading}
      dataSource={bookHistory}
      rowKey={item => item.key}
      columns={borrowedBooksColumns({
        returnBook,
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
  setNotification,
  searchText,
  searchColumn,
  searchInput,
  handleSearch,
  handleReset,
}) => {
  const {TabPane} = Tabs;
  const [reviewHistory, setReviewHistory] = useState([]);
  const [bookHistory, setBookHistory] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getReviewHistory().then(res => {
      const {data} = res;
      setReviewHistory(data.reviewHistory);
    });
  }, []);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    getBookHistory().then(res => {
      const {data} = res;
      const temp = [];

      setLoading(true);
      data.bookHistory.map(item => {
        const values = {
          key: item._id,
          title: item.book.title,
          author: item.book.author,
          instanceId: item.log.book,
          timeBorrowed: moment(item.log.timeBorrowed).format(
            'MMMM Do YYYY, h:mm:ss a',
          ),
          timeReturned: item.log.timeReturned
            ? moment(item.log.timeReturned).format('MMMM Do YYYY, h:mm:ss a')
            : 'return',
        };
        return temp.push(values);
      });

      setBookHistory(temp);
      setLoading(false);
    });
  };

  const returnBook = record => {
    returnBookInstance(record.instanceId)
      .then(res => {
        const {isSuccess} = res;
        if (isSuccess) {
          setNotification(res);
          refreshData();
        }
      })
      .catch(err => {
        setNotification({isSuccess: false, message: err.message});
      });
  };

  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Borrowed Books" key="1">
          <BorrowedBooks
            isLoading={isLoading}
            returnBook={returnBook}
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
