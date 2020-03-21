import { CODE } from './util/code';
import ResponseError from "./util/error"

export const handler = (event, context, callback) => {
  try {
    if (event.httpMethod !== 'GET') throw new ResponseError(405, "Method not allowed!")
    const { q } = event.queryStringParameters

    const isTaken = q === 'username'
    callback(null, CODE[200](null, {name:"taken", data: isTaken}))
  } catch (err) {
    const {code, message} = err
    callback(null,CODE[code||400](message))
  }

};
