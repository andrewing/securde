/* eslint-disable react/destructuring-assignment */
import React, {useState, useEffect} from 'react';
import {Jumbotron, Container} from 'react-bootstrap';
import BookInfo from '../../components/BookInfo';
import AddReview from '../../components/AddReview';
// import reviewsData from '../../components/reviewsData';
import ReviewList from '../../components/ReviewList';
import BorrowBookModal from '../../components/modals/BorrowBookModal';
import {createReview, getReviewByBookId} from '../../../../api/review/index';

const ViewBook = ({props}) => {
  const {state} = props.location;
  const {setNotification} = props;
  const [reviewsData, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getReviewList();
  }, []);

  const postReview = content => {
    const {id} = state;
    const body = {
      ...content,
      book: id,
    };
    setLoading(true);
    createReview(body)
      .then(res => {
        setNotification(res);
        getReviewList();
        setLoading(false);
      })
      .catch(err => {
        setNotification({isSuccess: false, message: err.message});
        setLoading(false);
      });
  };

  const getReviewList = () => {
    getReviewByBookId(state.id).then(res => {
      const {data} = res;
      setReviews(data.reviews);
    });
  };

  const showBorrowBook = () => {
    setShowModal(true);
  };

  const borrowBook = values => {
    // console.log(state, values);
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
            {state.author.map((item, i) => {
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
        <AddReview postReview={postReview} isLoading={isLoading} />
        <ReviewList reviews={reviewsData} />
      </Container>

      <BorrowBookModal
        data={state}
        showModal={showModal}
        borrowBook={borrowBook}
        handleClose={handleClose}
      />
    </>
  );
};

export default ViewBook;
