import React from 'react';
import User from './components/User';
import Admin from './components/Admin';
import BookManager from './components/BookManager';

const Page = props => (
  <>
    <User />
    <Admin />
    <BookManager />
  </>
);

export default Page;
