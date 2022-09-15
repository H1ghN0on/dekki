export default {
  name: "outsider",
  mounted(el, binding) {
    console.log(el);
    el.clickOutsideEvent = function (e) {
      if (!(el === e.target.value || el.contains(e.target.value))) {
        binding.value();
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
};
