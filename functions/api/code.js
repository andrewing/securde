export const CODE = {
  200: (message = 'Success', data) => ({
    statusCode: 200,
    body: JSON.stringify({
      status: 'Ok',
      message,
      data,
    }),
  }),
  201: (message = 'Success') => ({
    statusCode: 201,
    body: JSON.stringify({
      status: 'Created',
      message,
    }),
  }),
  204: (message = 'Success') => ({
    statusCode: 204,
    body: JSON.stringify({
      status: 'No Content',
      message,
    }),
  }),
  304: (message = 'Redirection') => ({
    statusCode: 304,
    body: JSON.stringify({
      status: 'Not Modified',
      message,
    }),
  }),
  400: (message = 'Client Error') => ({
    statusCode: 400,
    body: JSON.stringify({
      status: 'Bad Request',
      message,
    }),
  }),
  401: (message = 'Client Error') => ({
    statusCode: 401,
    body: JSON.stringify({
      status: 'Unauthorized',
      message,
    }),
  }),
  403: (message = 'Client Error') => ({
    statusCode: 403,
    body: JSON.stringify({
      status: 'Forbidden',
      message,
    }),
  }),
  404: (message = 'Client Error') => ({
    statusCode: 404,
    body: JSON.stringify({
      status: 'Not Found',
      message,
    }),
  }),
  405: (message = 'Client Error') => ({
    statusCode: 405,
    body: JSON.stringify({
      status: 'Method Not Allowed',
      message,
    }),
  }),
  500: (message = 'Server Error') => ({
    statusCode: 500,
    body: JSON.stringify({
      status: 'Internal Server Error',
      message,
    }),
  }),
};
