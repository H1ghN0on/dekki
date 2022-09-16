<template>
  <div class="list">
    <div class="list__item">Название</div>
    <div class="list__item">Тип</div>
    <div class="list__item">Шрифт</div>
  </div>
  <div class="input-container">
    <deck-settings-form-field
      class="input-box"
      v-for="(item, index) in localModelValue"
      :key="item.id"
      v-model="localModelValue[index]"
      :onDelete="deleteField.bind(index)"
    />
  </div>

  <div @click="addField" class="add-btn pointer">Добавить</div>
</template>

<script>
import DeckSettingsFormField from "@/components/DeckSettingsFormField";
import { localModelValueMixin } from "@/mixins";

export default {
  name: "DeckSettingsFormSide",
  mixins: [localModelValueMixin],
  components: {
    DeckSettingsFormField,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    addField: { type: Function, required: true },
    deleteField: { type: Function, required: true },
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: grid;

  grid-template-columns: 50% 25% 20%;
  grid-gap: 5px;
  .list__item {
    font-weight: bold;
    margin-bottom: 5px;
  }
}
.input-container {
  width: 100%;
  display: grid;
  grid-gap: 5px;
  .input-box {
    display: grid;
    align-items: center;
    grid-template-columns: 50% 25% 20% 5%;
    grid-gap: 5px;
  }
}
.add-btn {
  display: flex;
  justify-content: center;
}
</style>