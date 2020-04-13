import {request} from './api';

export const dbStart = () => request(`/db-start`, {method: 'POST'});
