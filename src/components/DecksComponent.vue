<template>
    <deck-list :decks="decks" />
</template>
  
<script>
import DeckList from "@/components/DeckList.vue";
import { useDeck } from "@/hooks";
export default {
    name: "DecksPage",
    components: {
        DeckList,
    },
    async setup() {
        const { getMyDecks } = useDeck()
        const decks = await getMyDecks();
        return { decks: decks ?? [] }
    },
};
</script>
  
<style lang="scss" scoped>

</style>
  