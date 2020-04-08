import {request} from '../api';

export const createManager = body =>
  request('/admin/create-manager', {method: 'POST', body}, true);
export const getSystemLogs = () => request('/admin/logs');
export const getSystemLogsPaginated = (page, limit) =>
  request(`/admin/paginated-logs?limit=${limit}&page=${page}`, true);
export const updateAccount = (body, accountId) =>
  request(`/admin/update-account?q=${accountId}`, {method: 'PUT', body}, true);
export const deleteAccount = body =>
  request(`/admin/delete-account`, {method: 'POST', body}, true);
export const getAccountsPaginated = (page, limit, fields = '') =>
  request(
    `/admin/paginated-accounts?limit=${limit}&page=${page}&type=${fields}`,
    true,
  );
