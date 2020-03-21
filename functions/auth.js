import { CODE } from './util/code';
import auth from './auth/'


export const handler = (event, context, callback) => {
  try{
    let [,,...restRoute] = event.path.split("/")
    restRoute = restRoute.join("/")
    auth(restRoute, event, context, callback)
  }catch(err){
    const {code, message} = err
    callback(null, CODE[code||400](message))
  }
}