import React from 'react';
import {Descriptions} from 'antd';

const BookInfoModal = ({data}) => {
  return (
    <>
      <Descriptions size="small" column={1} bordered>
        <Descriptions.Item label="Title">{data.title}</Descriptions.Item>
        <Descriptions.Item label="Author/s">
          {data.author.map((item, i) => {
            if (i === data.author.length - 1) {
              return <span key={i}> {item} </span>;
            }
            return <span key={i}>{item}, </span>;
          })}
        </Descriptions.Item>
        <Descriptions.Item label="ISBN">{data.ISBN}</Descriptions.Item>
        <Descriptions.Item label="Call Number">
          {data.callNumber}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default BookInfoModal;
