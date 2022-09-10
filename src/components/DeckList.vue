<template>
  <div class="deck-list">
    <div class="deck deck-add">
      <div class="name">Добавить сет</div>
    </div>
    <div v-for="deck in decks" :key="deck.id">
      <deck-list-item :deck="deck" />
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
  & :last-child {
    margin-bottom: 0;
  }
  & > div {
    margin-bottom: 15px;
  }
}
</style>