<template>
  <form>
    <div class="form-part front">
      <div class="title">Лицевая сторона</div>
      <div class="main">
        <base-input v-model="data.attr1" :label="'Название'" />
        <base-input v-model="data.attr2" :label="'Кана'" />
      </div>
    </div>
    <div class="form-part back">
      <div class="title">Тыльная сторона</div>
      <div class="main">
        <base-input v-model="data.attr3" :label="'Перевод'" />
        <base-input v-model="data.attr4" :label="'Значение кандзи'" />
      </div>
    </div>
  </form>
</template>

<script>
import BaseInput from "@/components/BaseInput";
export default {
  name: "DeckUpdateForm",
  components: { BaseInput },
  data() {
    return {
      data: {
        attr1: "",
        attr2: "",
        attr3: "",
        attr4: "",
      },
    };
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