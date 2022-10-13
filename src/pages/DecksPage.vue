<template>
  <the-header />
  <deck-list v-if="!isLoading" :decks="decks" />
  <div v-else>Загрузка...</div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import DeckList from "@/components/DeckList.vue";
import axios from "axios"
export default {
  name: "DecksPage",
  components: {
    TheHeader,
    DeckList,
  },

  async mounted() {
    this.isLoading = true;
    await axios.get("/decks/get-my/")
      .then(res => this.decks = res.data)
      .catch(err => {
        console.log(err);
      })
    this.isLoading = false;
  },


  data() {
    return {
      isLoading: false,
      decks: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.deck-list {
  width: 70vw;
  margin: 0 auto;
  margin-top: 90px;
}
</style>
