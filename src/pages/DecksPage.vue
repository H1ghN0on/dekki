<template>
  <the-header />
  <deck-list :decks="decks" />
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import DeckList from "@/components/DeckList.vue";

export default {
  name: "DecksPage",
  components: {
    TheHeader,
    DeckList,
  },

  data() {
    return {
      decks: [
        {
          name: "Кандзи",
          id: 0,
        },
        {
          name: "Слова",
          id: 0,
        },
        {
          name: "Кана",
          id: 0,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.deck-list {
  width: 60vw;
  margin: 0 auto;
  margin-top: 90px;
}
</style>
