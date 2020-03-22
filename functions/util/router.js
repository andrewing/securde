import ResponseError from './error';

export const handlePath = (route, paths, ...rest) => {
  const found = !paths.every(item => {
    const [func, path] = item;

    if (route.match(new RegExp(`^${path}$`))) {
      func(...rest);
      return false;
    }
    return true;
  });
  if (!paths.length) return;
  if (!found) throw new ResponseError(404, 'Invalid Path!');
};

export default (func, ...params) => {
  const [event, context, callback] = params;
  let [, , ...restRoute] = event.path.split('/');
  restRoute = `${restRoute.join('/')}`;
  func(restRoute, event, context, callback);
};
