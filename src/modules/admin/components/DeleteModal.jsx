import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Tooltip} from 'antd';
import {DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';

const {confirm} = Modal;

const DeleteModal = prop => {
  /**
   * This function handles showing the modal.
   */
  const handleShow = () => {
    confirm({
      title: 'Do you want to delete the following user?',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      okType: 'danger',
      onOk() {
        handleDelete();
      },
    });
  };

  /**
   * This function handles deleting a book manager.
   */
  const handleDelete = () => {
    prop.handleDelete(prop.user._id);
  };

  return (
    <>
      <Tooltip title="Delete Book Manager">
        <DeleteOutlined onClick={handleShow} style={{color: '#fc6681'}} />
      </Tooltip>
    </>
  );
};

DeleteModal.propType = {
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
