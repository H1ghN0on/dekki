<template>
  <div class="list">
    <div class="list__item">Название</div>
    <div class="list__item">Тип</div>
    <div class="list__item">Шрифт</div>
  </div>
  <div class="input-container">
    <deck-settings-form-field
      class="input-box"
      v-for="(item, index) in sideData"
      :key="item.id"
      v-model="sideData[index]"
      :onDelete="handleDeleteFieldClick"
    />
  </div>

  <div @click="handleAddFieldClick" class="add-btn pointer">Добавить</div>
</template>

<script>
import DeckSettingsFormField from "@/components/DeckSettingsFormField";

export default {
  name: "DeckSettingsFormSide",
  components: {
    DeckSettingsFormField,
  },
  props: {
    modelValue: { type: [Object, Number], required: true },
    name: {
      type: String,
      required: true,
    },
  },

  computed: {
    sideData: {
      get() {
        return this.modelValue;
      },

      set(newValue) {
        this.$emit("update:modelValue", newValue);
      },
    },
  },
  methods: {
    handleAddFieldClick() {
      const defaultFields = {
        id: this.sideData.length,
        name: "",
        type: {
          name: "Больше",
          accessor: "main",
        },
        fontSize: 8,
      };
      if (this.sideData.length < 4) {
        this.sideData.push({
          id: defaultFields.id,
          name: defaultFields.name,
          type: defaultFields.type,
          fontSize: defaultFields.fontSize,
        });
      }
    },
    handleDeleteFieldClick(id) {
      if (this.sideData.length > 1) {
        this.sideData = this.sideData.filter((field, index) => index !== id);
      }
      for (let i = id; i < this.sideData.length; i++) {
        this.sideData[i].id--;
      }
    },
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