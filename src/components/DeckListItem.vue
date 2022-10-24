<template>
  <div class="card-wrapper">
    <div class="card">
      <div class="info">
        <div class="info-item name">{{ deck.name }}</div>
        <div class="info-item cards-number">90 карточек</div>
      </div>
      <base-button class="test-btn">Тест</base-button>
    </div>
    <div class="card-settings">
      <router-link :to="'/update/' + deck.slug">
        <b-icon-plus-circle-fill class="card-settings-item add pointer" />
      </router-link>
      <router-link :to="'/settings/' + deck.slug">
        <b-icon-gear-fill class="card-settings-item settings pointer" />
      </router-link>
      <b-icon-trash3-fill class="card-settings-item remove pointer" />
    </div>
  </div>
</template>

<script>

import BaseButton from "@/components/BaseButton";
import { BIconPlusCircleFill, BIconTrash3Fill, BIconGearFill } from "bootstrap-icons-vue";
export default {
  components: {
    BIconPlusCircleFill,
    BIconTrash3Fill,
    BIconGearFill,
    BaseButton,
  },
  props: {
    deck: {
      type: Object,
      required: true,
    },
  },



};
</script>

<style lang="scss" scoped>
.card-wrapper {
  position: relative;
  width: 100%;
}

.card {
  position: relative;

  background: white;
  padding: 20px 30px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  width: 100%;

  .info {
    text-align: center;
    width: 100%;

    .name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      font-size: 2em;
      font-weight: bold;
    }

    .cards-number {
      margin-top: 10px;
      font-size: 1em;
    }
  }

  .test-btn {
    margin-top: 50px;
    font-size: 1em;
    padding: 10px;
  }

}

.card-settings {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 2px;
  z-index: 100;
  width: 90%;
  background: white;
  display: flex;
  justify-content: space-between;
  border: 2px solid #c0c0c0;
  border-radius: 0 0 10px 10px;
  border-top: none;
  padding: 0 30px;


  max-height: 0;
  transition: .2s ease-in;

  overflow: hidden;
  opacity: 0;

  .card-settings-item {
    font-size: 1.5em;

    &.remove {
      color: $danger-text;
    }
  }
}

.card-settings:hover,
.card:hover+.card-settings {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  max-height: 50px;
  opacity: 1;
  padding: 10px 30px;
  transition: .2s ease-out;
}
</style>