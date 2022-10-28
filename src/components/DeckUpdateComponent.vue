<template>
    <div class="container">
        <DeckUpdateForm :deck="deck" :clearForm="clearForm" class="part form" />
        <DeckUpdatePreview :front="deck.structure.front" :back="deck.structure.back" class="part preview" />
    </div>
</template>
  
<script>

import DeckUpdateForm from "@/components/DeckUpdateForm";
import DeckUpdatePreview from "@/components/DeckUpdatePreview";
import { reactive } from "vue";
import { useRoute } from "vue-router"
import { useDeck } from "@/hooks"
export default {
    name: "DeckUpdatePage",
    components: {

        DeckUpdateForm,
        DeckUpdatePreview,
    },

    async setup() {
        const { getStructuredDeck } = useDeck();
        const route = useRoute();
        const { id, dbStructure } = await getStructuredDeck(route.params.deckSlug, (item) => ({
            ...item,
            value: "",
        }));


        const deck = reactive({ structure: { ...dbStructure }, id });
        const clearForm = () => {
            deck.structure = {
                front: deck.structure.front.map((item => ({ ...item, value: "" }))),
                back: deck.structure.back.map((item => ({ ...item, value: "" }))),
            }


        }
        return { deck, clearForm }
    },
};
</script>
  
<style lang="scss" scoped>
.container {
    display: flex;
    height: calc(100vh - 80px);
    align-items: center;
    justify-content: space-between;
    padding: 60px 0;

    .form {
        width: 35vw;
    }

    .preview {
        width: 35vw;
        margin-right: 30px;
    }
}
</style>