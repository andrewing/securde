import {request} from '../api';

export const createManager = body =>
  request('/admin/create-manager', {method: 'POST', body}, true);
export const getSystemLogs = () => request('/admin/logs');
export const getSystemLogsPaginated = (page, limit) =>
  request(`/admin/paginated-logs?limit=${limit}&page=${page}`);
export const udpateAccount = (body, accountId) =>
  request(`/admin/update-account?q=${accountId}`, {method: 'PUT', body});
export const deleteAccount = body =>
  request(`/admin/delete-account`, {method: 'POST', body});
