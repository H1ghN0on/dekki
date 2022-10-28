<template>
  <div class="deck-list">
    <div v-if="decks.length">
      <div class="deck deck-add">
        <span class="btn pointer">Добавить колоду</span>
      </div>
      <div v-if="decks.length" class="list">
        <div v-for="deck in decks" :key="deck.id">
          <deck-list-item :deck="deck" />
        </div>
      </div>

    </div>
    <div v-else class="empty-list">
      <div class="warning">Нет колод</div>
      <router-link to="/decks/settings">
        <base-button class="create-btn">Создать</base-button>
      </router-link>

    </div>

  </div>
</template>

<script>
import DeckListItem from "@/components/DeckListItem.vue";
import BaseButton from "@/components/BaseButton.vue";
export default {
  components: {
    BaseButton,
    DeckListItem,
  },

  props: {
    decks: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.deck-list {
  position: relative;

  .deck-add {
    font-size: 1.4em;
    font-weight: bold;
  }

  .list {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
  }

  .empty-list {
    text-align: center;

    .warning {
      font-size: 3em;
      font-weight: bold;
    }

    .create-btn {
      margin-top: 30px;
      font-size: 1.2em;
      padding: 15px 25px;
    }
  }
}
</style>