import normalize from 'normalize-url';
import {setTokens, getTokens} from './constants';

export const request = async (url, options = {}, tokenNeeded = false) => {
  const dummy = `http://dummy.com`;
  url = normalize(`${dummy}/.netlify/functions${url}`).substring(dummy.length);
  options = normalizeOpts(options);

  if (tokenNeeded) await refreshToken();
  return fetch(url, options);
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
      Authorization: getTokens().access,
    },
  };
};

export const refreshToken = async () => {
  await fetch('/.netlify/functions/refresh-token', {
    method: 'POST',
    headers: {
      Authorization: getTokens().refresh,
    },
  })
    .then(res => {
      if (res.status === 401) throw new Error(res.status);
      return res.json();
    })
    .then(json => {
      const {access, refresh} = json.data;
      setTokens(access, refresh);
    })
    .catch(err => {
      setTokens(null, null);
    });
};
