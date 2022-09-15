<template>
  <the-header />
  <div class="container">
    <BaseDeckForm class="form">
      <template v-slot:front>
        <div class="list">
          <div class="list__item">Название</div>
          <div class="list__item">Тип</div>
          <div class="list__item">Шрифт</div>
        </div>
        <div class="input-container">
          <div
            v-for="(item, index) in structure.front"
            :key="item.id"
            class="input-box"
          >
            <base-input v-model="item.name" />
            <base-select v-model="item.type" :items="fieldTypes" />
            <base-input
              v-model="item.fontSize"
              :type="'number'"
              :step="step"
              :min="0"
            />
            <b-icon-trash-fill
              class="icon"
              @click="handleDeleteFieldClick('front', index)"
            />
          </div>
        </div>
        <div @click="handleAddFieldClick('front')" class="add-btn">
          Добавить
        </div>
      </template>
      <template v-slot:back>
        <div class="list">
          <div class="list__item">Название</div>
          <div class="list__item">Тип</div>
          <div class="list__item">Шрифт</div>
        </div>
        <div class="input-container">
          <div
            v-for="(item, index) in structure.back"
            :key="item.id"
            class="input-box"
          >
            <base-input v-model="item.name" />
            <base-select v-model="item.type" :items="fieldTypes" />
            <base-input
              v-model="item.fontSize"
              :type="'number'"
              :step="step"
              :min="0"
            />
            <b-icon-trash-fill
              class="icon"
              @click="handleDeleteFieldClick('back', index)"
            />
          </div>
        </div>
        <div @click="handleAddFieldClick('back')" class="add-btn">Добавить</div>
      </template>
    </BaseDeckForm>
    <DeckUpdatePreview class="preview" />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import BaseInput from "@/components/BaseInput";
import BaseDeckForm from "@/components/BaseDeckForm";
import BaseSelect from "@/components/BaseSelect";
import { BIconTrashFill } from "bootstrap-icons-vue";
import DeckUpdatePreview from "@/components/DeckUpdatePreview";
export default {
  name: "DeckSettingsPage",
  components: {
    TheHeader,
    BaseInput,
    BaseDeckForm,
    DeckUpdatePreview,
    BaseSelect,
    BIconTrashFill,
  },
  data() {
    const defaultFields = {
      name: "",
      type: {
        name: "Больше",
        accessor: "main",
      },
      fontSize: 8,
    };

    return {
      structure: {
        front: [
          {
            name: defaultFields.name,
            type: defaultFields.type,
            fontSize: defaultFields.fontSize,
          },
          {
            name: defaultFields.name,
            type: defaultFields.type,
            fontSize: defaultFields.fontSize,
          },
        ],
        back: [
          {
            name: defaultFields.name,
            type: defaultFields.type,
            fontSize: defaultFields.fontSize,
          },
          {
            name: defaultFields.name,
            type: defaultFields.type,
            fontSize: defaultFields.fontSize,
          },
        ],
      },
      fieldTypes: [
        {
          name: "Больше",
          accessor: "main",
        },

        {
          name: "Меньше",
          accessor: "secondary",
        },
      ],
    };
  },

  methods: {
    step(value) {
      return value < 28 ? 4 : value < 48 ? 8 : 16;
    },
    handleAddFieldClick(side) {
      const defaultFields = {
        name: "",
        type: {
          name: "Больше",
          accessor: "main",
        },
        fontSize: 8,
      };
      if (this.structure[side].length < 4) {
        this.structure[side].push({
          name: defaultFields.name,
          type: defaultFields.type,
          fontSize: defaultFields.fontSize,
        });
      }
    },
    handleDeleteFieldClick(side, id) {
      if (this.structure[side].length > 1) {
        this.structure[side] = this.structure[side].filter(
          (field, index) => index !== id
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: calc(100vh - 80px);
  align-items: center;
  justify-content: space-between;
  padding: 60px 0;
  .icon {
    cursor: pointer;
  }
  .form {
    width: 45vw;
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
      cursor: pointer;
    }
  }
  .preview {
    width: 35vw;
    margin-right: 30px;
  }
}
</style>