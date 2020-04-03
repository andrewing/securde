let TOKENS = {
  access: null,
  refresh: null,
};

export const setTokens = (access, refresh) => {
  TOKENS = {
    access,
    refresh,
  };
};

export const getTokens = () => {
  return TOKENS;
};
