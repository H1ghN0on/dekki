import store from "@/store";

export default {
  computed: {
    breakpoints() {
      const arr = [];

      if (store.getters.xxlScreen) {
        arr.push("xxl");
      }

      if (store.getters.xlScreen) {
        arr.push("xl");
      }

      if (store.getters.lgScreen) {
        arr.push("lg");
      }

      if (store.getters.mdScreen) {
        arr.push("md");
      }

      if (store.getters.smScreen) {
        arr.push("sm");
      }

      return arr;
    },
  },
};
