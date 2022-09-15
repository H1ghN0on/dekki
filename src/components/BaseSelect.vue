<template>
  <div @focusOut="toggleSelect" class="select">
    <div @click="toggleSelect" class="active">
      <span>{{ modelValue.name }}</span>
      <b-icon-caret-down-fill />
    </div>
    <div class="list-container">
      <div class="list" :class="{ active: isSelectActive }">
        <div
          v-for="item in items"
          :key="item.id"
          @click="onItemSelect(item)"
          class="item"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
//TODO
//Закрытие при нажатии вне окна
import { BIconCaretDownFill } from "bootstrap-icons-vue";

export default {
  name: "base-select",
  components: { BIconCaretDownFill },

  props: {
    modelValue: {
      type: [Object, Number],
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      isSelectActive: false,
    };
  },

  methods: {
    onItemSelect(value) {
      this.$emit("update:modelValue", value);
      this.toggleSelect();
    },
    toggleSelect() {
      this.isSelectActive = !this.isSelectActive;
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  justify-content: center;
  align-items: start;
  .active {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    outline: none;
    padding: 10px;
    font-size: 0.9em;
    font-weight: bold;
  }
  .list-container {
    position: relative;
    width: 100%;
    .list {
      background: #ffffff;
      z-index: 100;
      display: none;
      position: absolute;
      border-top: 0;
      left: 0;
      top: 0;

      &.active {
        display: flex;
        flex-direction: column;
        align-items: start;

        & > .item {
          width: 100%;
          margin-bottom: 10px;
        }

        & :last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>