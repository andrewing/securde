const loginAuth = {
  isAuthenticated: true,

  verifyAccount(values) {
    if (values.username && values.password) loginAuth.isAuthenticated = true;
  },
};

export default loginAuth;
