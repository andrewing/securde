import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Modal} from 'react-bootstrap';

const questions = [
  'In what city did you have your first ever birthday party?',
  'What is the last name of your Science class teacher in high school?',
  'Which company manufactured your first mobile phone?',
  'Who was your childhood hero?',
  'Where was your best family vacation?',
];

const AddEditModal = prop => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [validated, setValidated] = useState(false);

  /**
   * States for elements inside the form
   */
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [idNumber, setIDNumber] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  const [answer, setAnswer] = useState('');

  /**
   * This function handles closing the modal and resetting the form.
   */
  const handleClose = () => {
    setShow(false);
    setValidated(false);
  };

  /**
   * This function handles showing the modal.
   */
  const handleShow = () => setShow(true);

  /**
   * This function handles submission of form.
   * @param { event } event - onSubmit event
   */
  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      if (prop.command === 'Add') {
        prop.handleAdd({
          firstname,
          lastname,
          username,
          password,
          email,
          idNumber,
          question: selectedQuestion,
          answer,
          bookHistory: [],
        });
      } else if (prop.command === 'Edit') {
        const user = {...prop.user};
        user.firstname = firstname;
        user.lastname = lastname;
        user.password = password;
        user.email = email;
        user.idNumber = idNumber;
        user.question = selectedQuestion;
        user.answer = answer;
        prop.handleUpdate(user);
      }
      handleClose();
    }
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);
  };

  useEffect(() => {
    if (prop.command === 'Edit' && !edit) {
      setFirstName(prop.user.firstname);
      setLastName(prop.user.lastname);
      setUsername(prop.user.username);
      setIDNumber(prop.user.idNumber);
      setEmail(prop.user.email);
      setSelectedQuestion(prop.user.question);
      setAnswer(prop.user.answer);
      setEdit(true);
    }
  });

  return (
    <>
      {prop.command === 'Add' ? (
        <Button variant="primary" onClick={handleShow} className="add-button">
          Add
        </Button>
      ) : (
        <Button variant="primary" onClick={handleShow} className="button-table">
          Edit
        </Button>
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          {prop.command === 'Add' ? (
            <Modal.Title>Add Book Manager</Modal.Title>
          ) : (
            <Modal.Title>Edit Book Manager</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form
            className="form"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group>
              <Form.Control
                required
                type="text"
                placeholder="First Name"
                className="field"
                value={firstname}
                onChange={event => setFirstName(event.target.value)}
              />
              <Modal.Footer className="divider" />
              <Form.Control.Feedback type="invalid">
                Please input a valid name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                required
                type="text"
                placeholder="Last Name"
                className="field"
                value={lastname}
                onChange={event => setLastName(event.target.value)}
              />
              <Modal.Footer className="divider" />
              <Form.Control.Feedback type="invalid">
                Please input a valid name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                required
                type="text"
                placeholder="ID Number"
                className="field"
                value={idNumber}
                onChange={event => setIDNumber(event.target.value)}
              />
              <Modal.Footer className="divider" />
              <Form.Control.Feedback type="invalid">
                Please input a valid ID number
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                required
                type="email"
                placeholder="Email Address"
                className="field"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
              <Modal.Footer className="divider" />
              <Form.Control.Feedback type="invalid">
                Please input a valid email address
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                required
                type="text"
                placeholder="Username"
                className="field"
                value={username}
                onChange={event => setUsername(event.target.value)}
              />
              <Modal.Footer className="divider" />
              <Form.Control.Feedback type="invalid">
                Please input a valid username
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                className="field"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
              <Modal.Footer className="divider" />
              <Form.Control.Feedback type="invalid">
                Password should be at least 8 characters
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                required
                as="select"
                placeholder="Security Question"
                value={selectedQuestion}
                onChange={event => setSelectedQuestion(event.target.value)}
                className="field"
              >
                {questions.map((value, index) => {
                  return (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  );
                })}
              </Form.Control>
              <Modal.Footer className="divider" />
              <Form.Control.Feedback type="invalid">
                This field is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                required
                type="text"
                value={answer}
                onChange={event => setAnswer(event.target.value)}
                placeholder="Answer"
                className="field"
              />
              <Modal.Footer className="divider" />
              <Form.Control.Feedback type="invalid">
                This field is required
              </Form.Control.Feedback>
            </Form.Group>

            <div className="button-wrapper">
              <Button variant="primary" type="submit" className="button">
                {prop.command === 'Add' ? 'Add' : 'Save Changes'}
              </Button>
              <Button
                variant="secondary"
                onClick={handleClose}
                className="button"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

AddEditModal.propType = {
  command: PropTypes.string.isRequired,
  user: PropTypes.object,
  handleAdd: PropTypes.func,
  handleUpdate: PropTypes.func,
};

export default AddEditModal;
