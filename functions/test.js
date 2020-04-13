import {CODE} from './util/code';

export const handler = (event, context, callback) => {
  callback(null, CODE(200, 'This test is working!'));
};
