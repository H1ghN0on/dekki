<template>
  <the-header />
  <div class="container">
    <DeckSettingsForm v-model="structure" class="form" />
    <DeckUpdatePreview class="preview" />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import DeckSettingsForm from "@/components/DeckSettingsForm";
import DeckUpdatePreview from "@/components/DeckUpdatePreview";
export default {
  name: "DeckSettingsPage",
  components: {
    TheHeader,
    DeckSettingsForm,
    DeckUpdatePreview,
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
            id: 0,
            name: defaultFields.name,
            type: defaultFields.type,
            fontSize: defaultFields.fontSize,
          },
          {
            id: 1,
            name: defaultFields.name,
            type: defaultFields.type,
            fontSize: defaultFields.fontSize,
          },
        ],
        back: [
          {
            id: 0,
            name: defaultFields.name,
            type: defaultFields.type,
            fontSize: defaultFields.fontSize,
          },
          {
            id: 1,
            name: defaultFields.name,
            type: defaultFields.type,
            fontSize: defaultFields.fontSize,
          },
        ],
      },
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