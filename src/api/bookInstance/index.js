import {request} from '../api';

export const getBookInstanceById = id => request(`/book-instance?q=${id}`);
export const getBookInstanceByBook = bookId =>
  request(`/book-instance/by-book?q=${bookId}`);
export const borrowBookInstance = id =>
  request(`/book-instance/borrow?q=${id}`, {method: 'PUT'});
export const returnBookInstance = id =>
  request(`/book-instance/return?q=${id}`, {method: 'PUT'});
export const editBookInstance = (id, body) =>
  request(`/book-instance/edit?q=${id}`, {method: 'PUT', body});
export const deleteBookInstance = body =>
  request(`/book-instance/remove`, {method: 'POST', body});
export const getBookInstancePaginated = (page, limit, bookId) =>
  request(
    `/book-instance/paginated-by-book?limit=${limit}&page=${page}&book=${bookId}`,
  );
