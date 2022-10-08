<template>
  <button class="pointer">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "base-button",
};
</script>

<style lang="scss" scoped>
button {
  background: $button-primary;
  color: $button-text;
  border: none;
  border-radius: 10px;
  padding: 20px 40px;
  font-size: 1.5em;
}
</style>