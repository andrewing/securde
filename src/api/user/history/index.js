import {request} from '../../api';

export const getReviewHistory = () => request('/user/history/review');
export const getBookHistory = () => request('/user/history/book');
