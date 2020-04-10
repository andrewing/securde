import {request} from '../api';

export * from './history';
export const getUserDetails = () =>
  request(`/user/details`, {method: 'GET'}, true);
export const getQuestion = userId => request(`/user/get-question?q=${userId}`);
export const forgotPassword = body =>
  request('/user/forgot-password', {method: 'POST', body});
export const changePassword = body =>
  request('/user/change-password', {method: 'POST', body}, true);
export const getId = username => request(`/user/get-id?q=${username}`, true);
export const checkAnswer = body =>
  request(`/user/check-answer`, {method: 'POST', body});
export const getDetails = () => request(`/user/details`);
