<template>

  <button :disabled="isLoading" class="pointer">
    <slot v-if="!isLoading"></slot>
    <base-loading v-else :width="20" :height="20" :borderWidth=1 :color="'white'" />
  </button>


</template>

<script>
import BaseLoading from "@/components/BaseLoading"

export default {
  name: "base-button",
  components: { BaseLoading },
  props: {
    isLoading: Boolean,
  }
};
</script>

<style lang="scss" scoped>
button {
  position: relative;
  background: $button-primary;
  color: $button-text;
  border: none;
  border-radius: 10px;
  padding: 20px 40px;
  font-size: 1.5em;
}
</style>