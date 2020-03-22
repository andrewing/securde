import ResponseError from './error';

export const SECRET = process.env.AUTHSECRET || 'localhostsecret';

export const jwtError = err => {
  switch (err.name.toUpperCase()) {
    case 'TOKENEXPIREDERROR':
    case 'JSONWEBTOKENERROR':
      return new ResponseError(401, err.message);
    default:
      return new ResponseError(500, err.message);
  }
};
