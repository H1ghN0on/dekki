<template>
  <div class="input-box">
    <label v-if="label" class="input-name">{{ label }}</label>
    <input :value="modelValue" @input="updateValue" :type="type" :placeholder="label ? label + '...' : ''"
      :step="stepChange" :min="min" :max="max" :class="className" />
  </div>
</template>

<script>
export default {
  name: "base-input",
  props: {
    label: String,
    modelValue: {
      type: [String, Number],
      required: true,
    },
    type: {
      type: String,
      validator(value) {
        return ["text", "number", "password"].includes(value);
      },
    },
    step: Function,
    min: Number,
    max: Number,
    className: String,

  },
  methods: {
    updateValue(e) {
      this.$emit("update:modelValue", this.type === "number" ? +e.target.value : e.target.value);
    },
  },
  computed: {
    stepChange() {
      if (!this.step) return 0;
      return this.step(this.modelValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-box {
  display: flex;
  flex-direction: column;

  .input-name {
    margin-bottom: 5px;
  }

  input {
    font-family: "Raleway";
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    outline: none;
    padding: 10px;
    font-size: 0.9em;
  }
}
</style>