import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const DeleteModal = prop => {
  
  /**
   * This function handles showing the modal.
   */
  const handleShow = () => {
    confirm({
      title: 'Do you want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okType: 'danger',
      onOk() {
        handleDelete()
      }
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
      <Button danger type="primary" onClick={handleShow} className='button-table'>
        Delete
      </Button>
    </>
  );
};

DeleteModal.propType = {
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
