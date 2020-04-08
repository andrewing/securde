/* eslint-disable react/destructuring-assignment */
import React, {useState} from 'react';
import {Jumbotron, Container} from 'react-bootstrap';
import BookInfo from '../../components/BookInfo';
import AddReview from '../../components/AddReview';
import reviewsData from '../../components/reviewsData';
import ReviewList from '../../components/ReviewList';
import BorrowBookModal from '../../components/modals/BorrowBookModal';

const ViewBook = ({props}) => {
  const {state} = props.location;
  const [reviews, addReview] = useState(reviewsData);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState();

  const postReview = review => {
    // console.log(review);
  };

  const showBorrowBook = record => {
    setShowModal(true);
    setSelectedBook(record);
  };

  const borrowBook = values => {
    // console.log(selectedBook, values);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Jumbotron bsPrefix="page-header" fluid>
        <div style={{paddingLeft: 70}}>
          <h1>{state.title}</h1>
          <div title={state.author}>
            <span>Authored By </span>
            {state.authors.map((item, i) => {
              if (i === state.author.length - 1) {
                return <span key={i}> {item} </span>;
              }
              return <span key={i}>{item}, </span>;
            })}
          </div>
        </div>
      </Jumbotron>
      <br />
      <BookInfo state={state} showBorrowBook={showBorrowBook} />

      <h1 style={{paddingLeft: 130, margin: '15px 0'}}>Book Reviews</h1>

      <Container>
        <AddReview postReview={postReview} />
        <ReviewList reviews={reviews} />
      </Container>

      <BorrowBookModal
        data={selectedBook}
        showModal={showModal}
        borrowBook={borrowBook}
        handleClose={handleClose}
      />
    </>
  );
};

export default ViewBook;
