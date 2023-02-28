export default {
  serverBaseurl: "http://localhost:2020",
  api: {
    user: {
      create: "/users",
      update: "/users/",
      delete: "/users/",
      getone: "/users/",
      getAll: "/users",
    },
    auth: {
      userLogin: "/auth/login",
      validateToken: "/auth/validate-token",
      refreshToken: "/auth/refresh-token",
    },
  },
};
