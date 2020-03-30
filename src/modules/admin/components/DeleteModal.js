import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Modal} from 'react-bootstrap';

const DeleteModal = prop => {
  const [show, setShow] = useState(false);

  /**
   * This function handles closing the modal.
   */
  const handleClose = () => {
    setShow(false);
  };

  /**
   * This function handles showing the modal.
   */
  const handleShow = () => setShow(true);

  /**
   * This function handles deleting a book manager.
   */
  const handleDelete = () => {
    prop.handleDelete(prop.user._id);
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow} className="button-table">
        Delete
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Book Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Are you sure you want to delete ${prop.user.firstname} ${prop.user.lastname}?`}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

DeleteModal.propType = {
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
