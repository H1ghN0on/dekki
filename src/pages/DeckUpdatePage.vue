<template>
  <the-header />
  <div class="container">
    <DeckUpdateForm class="part form" />
    <DeckUpdatePreview
      class="part preview"
      :main="'作る'"
      :secondary="'つくる'"
    />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import DeckUpdateForm from "@/components/DeckUpdateForm";
import DeckUpdatePreview from "@/components/DeckUpdatePreview";

export default {
  name: "DeckUpdatePage",
  components: {
    TheHeader,
    DeckUpdateForm,
    DeckUpdatePreview,
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
  .part {
    background: white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  }
  .form {
    width: 35vw;
  }
  .preview {
    width: 35vw;
    margin-right: 30px;
  }
}
</style>