import normalize from 'normalize-url';
import {auth} from './auth';

export const request = async (url, options = {}, tokenNeeded = false) => {
  const dummy = `http://dummy.com`;
  url = normalize(`${dummy}/.netlify/functions${url}`).substring(dummy.length);
  options = normalizeOpts(options);

  if (tokenNeeded) await refreshToken();
  return fetch(url, options).then(res => res.json());
};

const normalizeOpts = options => {
  let method = 'GET';
  if (options.method) method = options.method.toUpperCase();

  let body = null;
  if (options.body) body = JSON.stringify(options.body);

  return {
    ...options,
    method,
    body,
    headers: {
      Authorization: auth.accessToken,
    },
  };
};

export const refreshToken = async () => {
  await fetch('/.netlify/functions/refresh-token', {
    method: 'POST',
    headers: {
      Authorization: auth.refreshToken,
    },
  })
    .then(res => {
      if (res.status === 401) throw new Error(res.status);
      return res.json();
    })
    .then(json => {
      const {access, refresh, type} = json.data;
      auth.authenticate(access, refresh, type);
    })
    .catch(err => {
      auth.signout();
    });
};
