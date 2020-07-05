/* eslint-disable consistent-return */ /* eslint-disable no-nested-ternary */
import React, {useState, useEffect} from 'react';
import {Tag} from 'antd';
import {getBookInstanceByBook} from '../../../../api/bookInstance/index';

const Status = ({record}) => {
  const [isAvailable, setAvailability] = useState(null);

  useEffect(() => {
    getBookInstanceByBook(record._id).then(res => {
      const {data} = res;
      const instances = data.bookInstances;

      if (instances && instances.length) {
        const itemAvailable = instances.find(item => item.isAvailable);
        if (itemAvailable) {
          return setAvailability(true);
        }
        return setAvailability(false);
      }
    });
  }, [record]);

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
