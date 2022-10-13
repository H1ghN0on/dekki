<template>
  <div class="deck-list">
    <div class="deck deck-add">
      <span class="btn pointer">Добавить сет</span>
    </div>
    <div v-if="decks.length" class="list">
      <div v-for="deck in decks" :key="deck.id">
        <deck-list-item :deck="deck" />
      </div>
    </div>
    <div v-else class="empty-list">
      Пусто
    </div>

  </div>
</template>

<script>
import DeckListItem from "@/components/DeckListItem.vue";
export default {
  components: {
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
}
</style>