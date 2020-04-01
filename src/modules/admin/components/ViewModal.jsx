import React, {useState} from 'react';
import {Descriptions, Modal, Tooltip} from 'antd';
import {EyeOutlined} from '@ant-design/icons';

const ViewModal = prop => {
  const [show, setShow] = useState(false);

  /**
   * This function handles showing the modal.
   */
  const handleShow = () => setShow(true);

  /**
   * This function handles closing the modal and resetting the form.
   */
  const handleClose = () => setShow(false);

  return (
    <>
      <Tooltip title="View Book Manager">
        <EyeOutlined
          onClick={handleShow}
          style={{color: '#6c63ff'}}
          className="icons"
        />
      </Tooltip>

      <Modal
        className="admin-modal"
        visible={show}
        centered
        onCancel={handleClose}
        title="Book Manager Information"
        footer={null}
      >
        <Descriptions
          title="Personal Information"
          bordered
          className="user-info"
        >
          <Descriptions.Item
            label="ID Number"
            span={3}
            className="description-item"
          >
            {prop.user.idNumber}
          </Descriptions.Item>
          <Descriptions.Item
            label="Username"
            span={3}
            className="description-item"
          >
            {prop.user.username}
          </Descriptions.Item>
          <Descriptions.Item
            label="First Name"
            span={3}
            className="description-item"
          >
            {prop.user.firstname}
          </Descriptions.Item>
          <Descriptions.Item
            label="Last Name"
            span={3}
            className="description-item"
          >
            {prop.user.lastname}
          </Descriptions.Item>
          <Descriptions.Item
            label="Email Address"
            span={3}
            className="description-item"
          >
            {prop.user.email}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="Security Question" bordered className="user-info">
          <Descriptions.Item
            label="Question"
            span={3}
            className="description-item"
          >
            {prop.user.question}
          </Descriptions.Item>
          <Descriptions.Item
            label="Answer"
            span={3}
            className="description-item"
          >
            {prop.user.answer}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default ViewModal;
