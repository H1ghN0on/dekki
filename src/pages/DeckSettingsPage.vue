<template>
  <the-header />
  <div class="container">
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
</template>

<script>
import TheHeader from "@/components/TheHeader";
import DeckSettingsForm from "@/components/DeckSettingsForm";
import DeckUpdatePreview from "@/components/DeckUpdatePreview";
import { useDeckSettingsForm } from "@/hooks";

export default {
  name: "DeckSettingsPage",
  components: {
    TheHeader,
    DeckSettingsForm,
    DeckUpdatePreview,
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
  height: calc(100vh - 80px);
  align-items: center;
  justify-content: space-between;
  padding: 60px 0;

  .form {
    width: 45vw;
  }
  .preview {
    width: 35vw;
    margin-right: 30px;
  }
}
</style>