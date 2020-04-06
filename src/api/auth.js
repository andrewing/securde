export const auth = {
  authType: null,
  accessToken: null,
  refreshToken: null,
  authenticate: (access, refresh, type) => {
    auth.accessToken = access;
    auth.refreshToken = refresh;
    auth.authType = type;
  },
  signout: () => {
    auth.accessToken = null;
    auth.refreshToken = null;
    auth.authType = null;
  },
  isAuthenticated: () => {
    return !!auth.accessToken || !!auth.refreshToken;
  },
};
