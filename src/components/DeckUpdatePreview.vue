<template>
  <div class="preview">
    <div class="preview-part name">{{ main }}</div>
    <div class="preview-part description">{{ secondary }}</div>
    <div class="flip">Перевернуть</div>
  </div>
</template>

<script>
export default {
  name: "DeckUpdatePreview",
  props: {
    main: {
      type: String,
      required: true,
    },
    secondary: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.preview {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .preview-part {
    &.name {
      font-weight: bold;
      font-size: 4em;
    }

    &.description {
      font-size: 1.5em;
    }
  }
  .flip {
    cursor: pointer;
    position: absolute;
    bottom: 5px;
  }
}
</style>