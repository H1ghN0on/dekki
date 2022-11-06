import store from "@/store";

export default {
  name: "responsive",
  mounted(el) {
    console.log(el);
    el.onResize = function () {
      store.commit("updateWidth", window.innerWidth);
    };
    window.addEventListener("resize", el.onResize);
  },
  unmounted(el) {
    window.removeEventListener("resize", el.onResize);
  },
};
