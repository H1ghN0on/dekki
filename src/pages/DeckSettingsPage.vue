<template>
  <the-header />
  <div class="container">
    <div class="form-container">
      <DeckSettingsForm
        :handleAddToFront="handleAddToFront"
        :handleAddToBack="handleAddToBack"
        :handleDeleteFromFront="handleDeleteFromFront"
        :handleDeleteFromBack="handleDeleteFromBack"
        v-model="structure"
        class="form"
      />
      <DeckUpdatePreview class="preview" />
    </div>
    <div class="table-container">
      <DeckSettingsTable />
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