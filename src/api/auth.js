export const auth = {
  authType: null,
  accessToken: null,
  refreshToken: null,
  authenticate: (access, refresh, type) => {
    auth.access = access;
    auth.refresh = refresh;
    auth.type = type;
  },
  signout: () => {
    auth.access = null;
    auth.refresh = null;
    auth.type = null;
  },
};
