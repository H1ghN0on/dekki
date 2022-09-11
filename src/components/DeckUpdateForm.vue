<template>
  <form>
    <div class="form-part front">
      <div class="title">Лицевая сторона</div>
      <div class="main">
        <base-input
          v-for="item in front"
          :key="item.id"
          v-model="item.value"
          :label="item.name"
        />
      </div>
    </div>
    <div class="form-part back">
      <div class="title">Тыльная сторона</div>
      <div class="main">
        <base-input
          v-for="item in back"
          :key="item.id"
          v-model="item.value"
          :label="item.name"
        />
      </div>
    </div>
  </form>
</template>

<script>
import BaseInput from "@/components/BaseInput";
export default {
  name: "DeckUpdateForm",
  components: { BaseInput },
  props: {
    front: {
      type: Array,
      required: true,
    },
    back: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  padding: 50px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  background: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  .form-part {
    .title {
      font-size: 1.4em;
      font-weight: bold;
      padding-bottom: 10px;
      border-bottom: 1px solid silver;
    }
    .main {
      padding: 20px 0;
      & > .input {
        margin-bottom: 15px;
      }

      & :last-child {
        margin-bottom: 0;
      }
    }
    &.back {
      .main {
        padding-bottom: 0;
      }
    }
  }
}
</style>