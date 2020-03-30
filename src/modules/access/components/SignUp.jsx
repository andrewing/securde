import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Modal} from 'react-bootstrap';

const SignUp = ({showModal, handleClose}) => {
  const [validated, setValidated] = useState(false);

  const onSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="sm"
    >
      <Modal.Header closeButton style={{textAlign: 'center'}}>
        <Modal.Title id="contained-modal-title-vcenter">Sign Up!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} style={{textAlign: 'center'}}>
          <Form.Group controlId="fname">
            <Form.Group controlId="id_number">
              <Form.Control
                required
                type="number"
                autoComplete="off"
                placeholder="ID Number"
                bsPrefix="input-fields"
              />
              <Form.Control.Feedback type="invalid">
                Please provide an ID Number.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Control
              required
              autoComplete="off"
              placeholder="First Name"
              bsPrefix="input-fields"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a First Name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="lname">
            <Form.Control
              required
              autoComplete="off"
              placeholder="Last Name"
              bsPrefix="input-fields"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a Last Name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Control
              required
              type="email"
              autoComplete="off"
              placeholder="Email"
              bsPrefix="input-fields"
            />
            <Form.Control.Feedback type="invalid">
              Please provide an Email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Control
              required
              type="password"
              placeholder="Password"
              bsPrefix="input-fields"
            />
            <Form.Control.Feedback type="invalid">
              Please input a valid password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="confirm_password">
            <Form.Control
              required
              type="password"
              placeholder="Confirm Password"
              bsPrefix="input-fields"
            />
            <Form.Control.Feedback type="invalid">
              Passwords do not match.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{justifyContent: 'center'}}>
        <Button
          bsPrefix="primary-button"
          onClick={onSubmit}
          style={{margin: '0 15px'}}
        >
          Submit
        </Button>
        <Button bsPrefix="secondary-button" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

SignUp.propTypes = {
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default SignUp;
