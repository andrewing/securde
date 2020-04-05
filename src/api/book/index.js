import {request} from '../api';

export const getBookByAuthorAndTitle = bookOrTitle =>
  request(`/book?q=${bookOrTitle}`);
export const getAllBooks = () => request(`/book/get`);
export const deleteBook = body =>
  request('/book/remove', {method: 'POST', body});
export const createBook = body =>
  request('/book/create', {method: 'POST', body});
export const updateBook = (body, id) =>
  request(`/book/update?q=${id}`, {method: 'PUT', body});
export const getBookPaginated = (page, limit, rest) =>
  request(`/book/paginated?page=${page}&limit=${limit}${rest}`);
