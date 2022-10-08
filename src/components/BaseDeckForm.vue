<template>
  <form class="base-deck-form">
    <div class="base-deck-form-part front">
      <div class="title">Лицевая сторона</div>
      <div class="main">
        <slot name="front"></slot>
      </div>
    </div>
    <div class="base-deck-form-part back">
      <div class="title">Тыльная сторона</div>
      <div class="main">
        <slot name="back"></slot>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "deck-form",
};
</script>

<style lang="scss">
.base-deck-form {
  display: flex;
  flex-direction: column;
  padding: 40px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  background: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

  .base-deck-form-part {
    .title {
      font-size: 1.4em;
      font-weight: bold;
      padding-bottom: 10px;
      border-bottom: 1px solid silver;
    }

    .main {
      padding: 20px 0;

      &>div {
        margin-bottom: 15px;
      }

      & :last-child {
        margin-bottom: 0;
      }
    }

    &.back {
      .main {
        padding-bottom: 0;
      }
    }
  }
}
</style>