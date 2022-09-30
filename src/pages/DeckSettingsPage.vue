<template>
  <the-header />
  <div class="container">
    <div class="form-container">
      <DeckSettingsForm :step="step" :handleAddToFront="handleAddToFront" :handleAddToBack="handleAddToBack"
        :handleDeleteFromFront="handleDeleteFromFront" :handleDeleteFromBack="handleDeleteFromBack" v-model="structure"
        class="form" />
      <DeckUpdatePreview class="preview" />
    </div>
    <div class="table-container">
      <DeckSettingsTable :headers="headers" :data="data.data" />
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import DeckSettingsForm from "@/components/DeckSettingsForm";
import DeckUpdatePreview from "@/components/DeckUpdatePreview";
import DeckSettingsTable from "@/components/DeckSettingsTable";
import { useDeckSettingsForm, useTable } from "@/hooks";
import { watch } from "vue";


export default {
  name: "DeckSettingsPage",
  components: {
    TheHeader,
    DeckSettingsForm,
    DeckUpdatePreview,
    DeckSettingsTable,
  },

  setup() {
    const defaultFields = {
      name: "",
      type: {
        name: "Больше",
        accessor: "main",
      },
      fontSize: 8,
    };
    const dbStructure = {
      front: [
        {
          id: 228,
          name: "rofl",
          type: defaultFields.type,
          fontSize: defaultFields.fontSize,
        },
        {
          id: 1488,
          name: "attr2",
          type: defaultFields.type,
          fontSize: defaultFields.fontSize,
        },
      ],
      back: [
        {
          id: 367,
          name: "attr3",
          type: defaultFields.type,
          fontSize: defaultFields.fontSize,
        },
        {
          id: 752,
          name: "attr4",
          type: defaultFields.type,
          fontSize: defaultFields.fontSize,
        },
      ],
    }

    const rawData = [
      {
        rofl: "Кто",
        attr2: "Куда",
        attr3: "А я по",
        attr4: "Тапочкам",

      },
      {
        rofl: "Кто",
        attr2: "Куда",
        attr3: "А я по",
        attr4: "Тапочкам",
      },
      {
        rofl: "Кто",
        attr2: "Куда",
        attr3: "А я по",
        attr4: "Тапочкам",
      },
    ];

    const deckStructureToTableStructure = (deckStr) => {
      return deckStr.front.concat(deckStr.back).map((item) => ({
        ...item,
        accessor: item.name + "_" + item.id,
      }));
    }

    const {
      structure,
      handleAddToFront,
      handleAddToBack,
      handleDeleteFromFront,
      handleDeleteFromBack,
      step,
    } = useDeckSettingsForm(dbStructure);


    const { updateStructure, data, headers } = useTable(deckStructureToTableStructure(structure), rawData);


    watch(structure, (newValue) => {
      const newStructure = deckStructureToTableStructure(newValue);
      updateStructure(newStructure);
    })

    return {
      handleAddToFront,
      handleAddToBack,
      handleDeleteFromFront,
      handleDeleteFromBack,
      structure,
      data,
      headers,
      step
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 80px);
  padding: 60px 0;

  .form-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-content: space-between;

    .form {
      width: 45vw;
    }

    .preview {
      width: 35vw;
      margin-right: 30px;
    }
  }

  .table-container {
    width: 90%;
    margin-top: 100px;
  }
}
</style>