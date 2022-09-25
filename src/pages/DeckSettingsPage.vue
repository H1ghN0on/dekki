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
    } = useDeckSettingsForm();

    return {
      handleAddToFront,
      handleAddToBack,
      handleDeleteFromFront,
      handleDeleteFromBack,
      structure,
    };
  },
  data() {
    return {
      headers: [
        {
          name: "Attr1",
          accessor: "attr1",
          width: 8,
          initWidth: 8,
        },
        {
          name: "Attr2",
          accessor: "attr2",
          width: 8,
          initWidth: 8,
        },
        {
          name: "Attr3",
          accessor: "attr3",
          width: 8,
          initWidth: 8,
        },
        {
          name: "Attr4",
          accessor: "attr4",
          width: 8,
          initWidth: 8,
        },
        {
          name: "Attr5",
          accessor: "attr5",
          width: 12,
          initWidth: 12,
        },
        {
          name: "Attr6",
          accessor: "attr6",
          width: 12,
          initWidth: 12,
        },
        {
          name: "Attr7",
          accessor: "attr7",
          width: 12,
          initWidth: 12,
        },

        {
          name: "Attr8",
          accessor: "attr8",
          width: 22,
          initWidth: 22,
        },
      ],
      data: [
        {
          attr1: "Кто",
          attr2: "Куда",
          attr3: "А я по",
          attr4: "Тапочкам",
          attr5: "Тапочкам",
          attr6: "ТапочкаТапочкамТапочкамТапочкамТапочкамТапочкамм",
          attr7: "Тапочкам",
          attr8: "ТапочкаТапочкамТапочкамТапочкамТапочкамТапочкамм",
        },
        {
          attr1: "Кто",
          attr2: "Куда",
          attr3: "А я по",
          attr4: "Тапочкам",
          attr5: "Тапочкам",
          attr6: "Тапочкам",
          attr7: "Тапочкам",
          attr8:
            "ТапочкТапочкакамамаа мТапочкамам ТапочкТапочкамочкамТапочкамТапоч камТапочкамТапочкамТапочкамам",
        },
        {
          attr1: "Кто",
          attr2: "Куда",
          attr3: "А я по",
          attr4: "Тапочкам",
          attr5: "Тапочкам",
          attr6: "Тапочкам",
          attr7: "Тапочкам",
          attr8: "ТапочТапочкамТапочкамкам",
        },
      ],
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