<template>
    <div class="container" :class="breakpoints">
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
import { breakpointsMixin } from "@/mixins";
export default {
    name: "DeckUpdatePage",
    mixins: [breakpointsMixin],
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

    &.lg {
        .form {
            width: 45vw;
        }
    }

    &.md {
        .form {
            width: 50vw;
        }

        .preview {
            width: 45vw;
            margin-right: 0;
        }
    }

    &.sm {
        padding-top: 10px;

        padding-bottom: 40px;
        flex-direction: column;

        .form {
            width: 90vw;

        }

        .preview {
            margin-top: 30px;
            width: 90vw;
        }
    }
}
</style>