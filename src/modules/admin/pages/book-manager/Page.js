import React from 'react';
import {Container, Jumbotron} from 'react-bootstrap';
import BookManagerList from '../../components/BookManagerList';

const Page = () => {
  return (
    <>
      <Jumbotron bsPrefix="page-header" fluid>
        <Container className="inner-container">
          <h1 style={{color: '#6C4CC5'}}>Book Manangers</h1>
          <p>
            Manage the book managers of your online library. You can add, edit,
            and delete book managers!
          </p>
        </Container>
      </Jumbotron>

      <div className="content-container">
        <BookManagerList />
      </div>
    </>
  );
};

export default Page;
