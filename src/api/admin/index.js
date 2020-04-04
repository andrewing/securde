import {request} from '../api';

export const createManager = body =>
  request('/admin/create-manager', {method: 'POST', body}, true);
export const getSystemLogs = () => request('/admin/logs');
