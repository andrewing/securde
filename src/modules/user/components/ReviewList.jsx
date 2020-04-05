import React from 'react';
import {Comment, Divider} from 'antd';
import moment from 'moment';

const List = ({reviews}) => {
  return reviews.map((item, i) => {
    return (
      <>
        <Comment
          key={i}
          author="Rae"
          content={item}
          dateTime={<span>{moment().fromNow()}</span>}
        />
        <Divider style={{margin: 5}} />
      </>
    );
  });
};

const ReviewList = ({reviews}) => {
  return (
    <div
      style={{
        border: '1px solid #EFEFEF',
        marginBottom: 20,
        height: 500,
        width: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <List reviews={reviews} />
    </div>
  );
};

export default ReviewList;
