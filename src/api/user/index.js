import {request} from '../api';

export * from './history';
export const getQuestion = userId => request(`/user/get-question?q=${userId}`);
export const forgotPassword = body =>
  request('/user/forgot-password', {method: 'POST', body});
export const changePassword = body =>
  request('/user/change-password', {method: 'POST', body});
export const getId = username => request(`/user/get-id?q=${username}`);
export const checkAnswer = body =>
  request(`/user/check-answer`, {method: 'POST', body});
