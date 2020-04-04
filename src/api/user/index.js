import {request} from '../api';

export * from './history';
export const getQuestion = () => request('/user/get-question');
export const forgotPassword = body =>
  request('/user/forgot-password', {method: 'POST', body});
export const changePassword = body =>
  request('/user/change-password', {method: 'POST', body});
