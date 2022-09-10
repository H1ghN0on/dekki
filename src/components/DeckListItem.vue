<template>
  <div class="deck-info">
    <div class="deck">
      <div class="name">{{ deck.name }}</div>
      <div class="settings">
        <div>
          <b-icon-gear-fill @click="toggleSettings" class="btn-settings" />
        </div>
        <div><base-button class="btn-test">Test</base-button></div>
      </div>
    </div>
    <Transition>
      <div v-if="isSettingsActive" class="deck-settings">
        <base-button class="btn">Добавить</base-button>
        <base-button class="btn">Изменить</base-button>
        <base-button class="btn danger">Удалить</base-button>
      </div>
    </Transition>
  </div>
</template>

<script>
import { BIconGearFill } from "bootstrap-icons-vue";
import BaseButton from "@/components/BaseButton";

export default {
  components: {
    BIconGearFill,
    BaseButton,
  },
  props: {
    deck: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isSettingsActive: false,
    };
  },

  methods: {
    toggleSettings() {
      this.isSettingsActive = !this.isSettingsActive;
    },
  },
};
</script>

<style lang="scss" scoped>
.deck-info {
  background: white;
  padding: 20px 30px;

  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
}
.deck {
  display: flex;
  align-items: center;

  justify-content: space-between;
  margin-bottom: 10px;
  .name {
    font-size: 2.25em;
    font-weight: bold;
  }
  .settings {
    display: flex;
    align-items: center;
    & > div {
      margin-right: 25px;
    }
    & :last-child {
      margin-right: 0;
    }
    .btn-settings {
      width: 40px;
      height: 40px;
    }
  }
}
.deck-settings {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid silver;
  .btn.danger {
    background: $button-danger;
  }
}

.v-leave-active,
.v-enter-active {
  transition: 0.3s;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translate(0, -10%);
}
</style>