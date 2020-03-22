import ResponseError from './error';

export const handlePath = (route, paths, ...rest) => {
  if (!paths.length) return;
  const found = !paths.every(item => {
    const [func, path] = item;

    if (route.match(new RegExp(`^${path.split('/')[0]}`))) {
      func(route, ...rest);
      return false;
    }
    return true;
  });
  if (!found) throw new ResponseError(404, 'Invalid Path!');
};

export const getNextPath = (func, ...params) => {
  const [event] = params;
  const [, , ...restRoute] = event.path.split('/');
  return `${restRoute.join('/')}`;
};

export default (func, ...params) => {
  const restRoute = getNextPath(func, ...params);
  func(restRoute, ...params);
};
