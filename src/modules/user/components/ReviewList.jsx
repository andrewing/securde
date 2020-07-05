import React from 'react';
import {Comment, Divider} from 'antd';
import moment from 'moment';

const Reviews = ({reviews}) => {
  return reviews.map((item, i) => {
    return (
      <div key={item._id}>
        <Comment
          content={item.content}
          author={`${item.account.firstname} ${item.account.lastname}`}
          datetime={<span>{moment(item.time).fromNow()}</span>}
        />
        {i !== reviews.length - 1 ? <Divider style={{margin: 5}} /> : ''}
      </div>
    );
  });
};

const ReviewList = ({reviews}) => {
  return (
    <div
      style={{
        border: '1px solid #EFEFEF',
        marginBottom: 20,
        maxHeight: 500,
        width: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <Reviews reviews={reviews} />
    </div>
  );
};

export default ReviewList;
