/* eslint-disable array-callback-return */ /* eslint-disable consistent-return */ /* eslint-disable react/destructuring-assignment */
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Jumbotron, Container} from 'react-bootstrap';
import BookInfo from '../../components/BookInfo';
import AddReview from '../../components/AddReview';
import ReviewList from '../../components/ReviewList';
import BorrowBookModal from '../../components/modals/BorrowBookModal';
import {createReview, getReviewByBookId} from '../../../../api/review/index';
import {getBookInstanceByBook} from '../../../../api/bookInstance/index';

const ViewBook = ({props}) => {
  const {state} = props.location;
  const {setNotification} = props;
  const [reviewsData, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isAvailable, setAvailability] = useState(null);
  const [datesAvailable, setDates] = useState([]);

  // for book info
  useEffect(() => {
    refreshData();
    // eslint-disable-next-line
  }, [state]);

  const getEarliestDate = () => {
    if (datesAvailable) {
      return datesAvailable.sort()[0];
    }
    return null;
  };

  // for reviews
  useEffect(() => {
    getReviewList();
    // eslint-disable-next-line
  }, []);

  const postReview = content => {
    const {_id} = state;
    const body = {
      ...content,
      book: _id,
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
    getReviewByBookId(state._id).then(res => {
      const {data} = res;
      setReviews(data.reviews);
    });
  };

  const showBorrowBook = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const refreshData = () => {
    getBookInstanceByBook(state._id).then(res => {
      const {data} = res;
      const dates = [];
      const instances = data.bookInstances;

      if (instances.length) {
        const itemAvailable = instances.find(item => item.isAvailable);
        if (itemAvailable) {
          return setAvailability(true);
        }

        instances.map(item => {
          if (item.dateAvailable) {
            dates.push(
              moment(item.dateAvailable).format('MMMM Do YYYY, h:mm:ss a'),
            );
          }
        });
        setDates(dates);
        return setAvailability(false);
      }
    });
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
      <BookInfo
        state={state}
        showBorrowBook={showBorrowBook}
        isAvailable={isAvailable}
        getEarliestDate={getEarliestDate}
      />

      <h1 style={{paddingLeft: 130, margin: '15px 0'}}>Book Reviews</h1>

      <Container>
        <AddReview postReview={postReview} isLoading={isLoading} />
        <ReviewList reviews={reviewsData} />
      </Container>

      <BorrowBookModal
        selectedBook={state}
        showModal={showModal}
        handleClose={handleClose}
        setNotification={setNotification}
        refreshData={refreshData}
      />
    </>
  );
};

export default ViewBook;
