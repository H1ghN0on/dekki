<template>
  <the-header />
  <div class="container">
    <div class="form-container">
      <DeckSettingsForm :handleAddToFront="handleAddToFront" :handleAddToBack="handleAddToBack"
        :handleDeleteFromFront="handleDeleteFromFront" :handleDeleteFromBack="handleDeleteFromBack" v-model="structure"
        class="form" />
      <DeckUpdatePreview class="preview" />
    </div>
    <div class="table-container">
      <DeckSettingsTable :headers="headers" :data="data" />
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import DeckSettingsForm from "@/components/DeckSettingsForm";
import DeckUpdatePreview from "@/components/DeckUpdatePreview";
import DeckSettingsTable from "@/components/DeckSettingsTable";
import { useDeckSettingsForm } from "@/hooks";
import { renameKeys, findDifferentObjectsIndicesInArrays } from "@/utils/ObjectUtils";


export default {
  name: "DeckSettingsPage",
  components: {
    TheHeader,
    DeckSettingsForm,
    DeckUpdatePreview,
    DeckSettingsTable,
  },

  setup() {
    const {
      structure,
      handleAddToFront,
      handleAddToBack,
      handleDeleteFromFront,
      handleDeleteFromBack,
      rawStructure,
    } = useDeckSettingsForm();

    return {
      handleAddToFront,
      handleAddToBack,
      handleDeleteFromFront,
      handleDeleteFromBack,
      structure,
      rawStructure,
    };
  },
  data() {
    return {
      data: [
        {
          attr1: "Кто",
          attr2: "Куда",
          attr3: "А я по",
          attr4: "Тапочкам",

        },
        {
          attr1: "Кто",
          attr2: "Куда",
          attr3: "А я по",
          attr4: "Тапочкам",
        },
        {
          attr1: "Кто",
          attr2: "Куда",
          attr3: "А я по",
          attr4: "Тапочкам",
        },
      ],
    }
  },

  computed: {
    headers() {

      return this.rawStructure.map((item, index) => ({
        ...item,
        width: 12,
        initWidth: 12,
        accessor: item.name ? item.name.toLowerCase() : "empty_" + index,
      }));
    },
  },



  watch: {
    headers(newValue, oldValue) {

      if (newValue.length === oldValue.length) {
        const indices = findDifferentObjectsIndicesInArrays(oldValue, newValue, "accessor");
        for (let index of indices) {
          this.data = this.data.map((item) => {
            if (newValue[index].accessor === "") {
              return renameKeys(item, { [oldValue[index].accessor]: "empty_" + index });
            }
            return renameKeys(item, { [oldValue[index].accessor]: newValue[index].accessor });
          })
        }

      }
    }
  }
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