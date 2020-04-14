import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Tooltip} from 'antd';
import {DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';

const {confirm} = Modal;

const DeleteModal = ({deleteBook, record, type}) => {
  const handleShow = () => {
    confirm({
      title: 'Are you sure you want to delete this row?',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      okType: 'danger',
      onOk() {
        deleteBook(record);
      },
    });
  };

  return (
    <>
      <Tooltip title="Delete">
        <DeleteOutlined
          onClick={handleShow}
          style={{color: '#fc6681', padding: 3}}
          className="icons"
        />
      </Tooltip>
    </>
  );
};

DeleteModal.propType = {
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
