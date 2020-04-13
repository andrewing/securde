import {request} from '../../api';

export const getReviewHistory = () => request('/user/history/review', {}, true);
export const getBookHistory = () => request('/user/history/book', {}, true);
