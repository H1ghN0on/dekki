const AuthApi = (instance) => {
  return {
    register: async (userInfo) => {
      try {
        const data = await instance.post("/auth/users/", userInfo);
        if (!data) {
          return [{ message: "Unhandled" }];
        }
        if (data.data) {
          return [null];
        } else {
          return [data];
        }
      } catch (error) {
        return [error];
      }
    },

    login: async (userInfo) => {
      try {
        const data = await instance.post("/auth/token/login/", userInfo);
        if (!data) {
          return [{ message: "Unhandled" }];
        }
        if (data.data) {
          return [null, data.data];
        } else {
          return [data];
        }
      } catch (error) {
        return [error];
      }
    },
  };
};

export default AuthApi;
