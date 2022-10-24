<template>
  <input @change="onChange" ref="inputRef" v-if="isInput" class="input switchable" type="text" @blur="isInput = false"
    :value="modelValue" @input="updateValue" />
  <span :style="{ cursor: 'text' }" v-else @click="isInput = true"
    v-html="modelValue ? modelValue : `<i>${placeholder}</i>`" />
</template>

<script>
export default {
  name: "base-switchable-input",
  props: {
    modelValue: [String, Number],
    placeholder: String,
    onChange: Function,
  },
  methods: {
    updateValue(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },

  data() {
    return {
      isInput: false,
    }
  },

  watch: {
    isInput(wasInput) {

      if (wasInput)
        this.$nextTick(() => { this.$refs.inputRef.focus() });
    }
  }
};
</script>

<style scoped lang="scss">
.switchable {
  font: inherit;
  border: none;
  outline: none;
  width: 100%;
  text-align: inherit;
  background: inherit;
}
</style>