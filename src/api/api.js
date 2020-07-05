import normalize from 'normalize-url';
import {auth} from './auth';
import {notify} from '../util/notification';
import {BASEURL} from '../util/constants';

export const request = async (url, options = {}, tokenNeeded = false) => {
  url = normalize(`${BASEURL}${url}`);
  options = normalizeOpts(options);

  if (tokenNeeded) await refreshToken();
  return timeoutIn(fetch(url, options), 60000);
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
  await fetch(`${BASEURL}/refresh-token`, {
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
      notify(
        false,
        'You have been signed out',
        'Your authentication may have been expired or invalid. Please log in again',
      );
      auth.signout();
    });
};

const timeoutIn = (promise, ms) => {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      reject({
        isSuccessful: false,
        message: 'Timed Out',
        description: 'Your request has timed out',
      });
    }, ms);

    promise
      .then(res => {
        clearTimeout(id);
        resolve(res.json());
      })
      .catch(err => {
        clearTimeout(id);
        resolve(err);
      });
  });
};
