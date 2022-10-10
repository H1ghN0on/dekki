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
          id: 1,
        },
        {
          name: "Кана",
          id: 2,
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
