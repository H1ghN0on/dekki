<template>
    <deck-list :decks="decks" :onRemove="onRemove" />
</template>
  
<script>
import DeckList from "@/components/DeckList.vue";
import { useDeck } from "@/hooks";
import { ref } from "vue"
export default {
    name: "DecksPage",
    components: {
        DeckList,
    },
    async setup() {
        const { getMyDecks } = useDeck()
        const decks = await getMyDecks();
        console.log(decks);
        return { decks: ref(decks) ?? [] }
    },

    methods: {
        onRemove(slug) {
            this.decks = this.decks.filter(deck => deck.slug !== slug);
        }
    }
};
</script>
  
<style lang="scss" scoped>

</style>
  