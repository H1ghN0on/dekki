import { createStore } from "vuex";

export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
    width: window.innerWidth,
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
    },

    removeToken(state) {
      state.token = "";
    },

    updateWidth(state, width) {
      state.width = width;
    },
  },

  actions: {},

  modules: {},

  getters: {
    isAuthenticated: (state) => !!state.token,

    xsScreen: (state) => state.width < 576,

    mdScreen: (state) => state.width < 768,

    lgScreen: (state) => state.width < 992,

    xlScreen: (state) => state.width < 1200,

    xxlScreen: (state) => state.width >= 1200,
  },
});
