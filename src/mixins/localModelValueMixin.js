export default {
  props: {
    modelValue: { type: [Object, Number], required: true },
  },
  computed: {
    localModelValue: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        this.$emit("update:modelValue", newValue);
      },
    },
  },
};
