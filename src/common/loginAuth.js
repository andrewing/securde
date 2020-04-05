const loginAuth = {
  isAuthenticated: false,

  verifyAccount(values) {
    if (values.username && values.password) loginAuth.isAuthenticated = true;
  },
};

export default loginAuth;
