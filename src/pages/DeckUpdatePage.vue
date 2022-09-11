<template>
  <the-header />
  <div class="container">
    <DeckUpdateForm :front="front" :back="back" class="part form" />
    <DeckUpdatePreview :front="front" :back="back" class="part preview" />
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
  data() {
    return {
      front: [
        {
          name: "Название",
          value: "",
          type: "name",
        },
        {
          name: "Кана",
          value: "",
          type: "description",
        },
      ],
      back: [
        {
          name: "Перевод",
          value: "",
          type: "name",
        },
        {
          name: "Значение кандзи",
          value: "",
          type: "description",
        },
      ],
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
    width: 35vw;
  }
  .preview {
    width: 35vw;
    margin-right: 30px;
  }
}
</style>