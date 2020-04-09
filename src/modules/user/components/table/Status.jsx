/* eslint-disable no-nested-ternary */
import React, {useState, useEffect} from 'react';
import {Tag} from 'antd';
import {getBookInstanceByBook} from '../../../../api/bookInstance/index';

const Status = ({id}) => {
  const [isAvailable, setAvailability] = useState(null);

  useEffect(() => {
    getBookInstanceByBook(id).then(res => {
      const {data} = res;
      const instances = data.bookInstances;

      if (instances.length) {
        instances.map(item => {
          if (item.isAvailable === false) return setAvailability(false);
          return setAvailability(true);
        });
      }
    });
  }, []);

  return (
    <>
      {isAvailable ? (
        <Tag color="green">Available</Tag>
      ) : isAvailable === false ? (
        <Tag color="red">Reserved</Tag>
      ) : (
        <Tag color="default">Not Available</Tag>
      )}
    </>
  );
};

export default Status;
