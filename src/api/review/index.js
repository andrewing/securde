import {request} from '../api';

export const createReview = body =>
  request('/review/create', {method: 'POST', body}, true);
export const getReviewByBookId = bookId => request(`/review?q=${bookId}`);
