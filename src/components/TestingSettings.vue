<template>

    <div class="testing-settings" :class="breakpoints">
        <div class="testing-number">
            <label>Количество карточек для тестирования (с конца)</label>
            <div class="input-container">
                <base-range v-model="cardsForTest" :min="4" :max="cardsNumber" />
                <base-input v-model="cardsForTest" class="number" type="number" :min="4" :max="cardsNumber" />
            </div>
        </div>
        <base-button class="submit-btn" @click="$emit('submit', { cardsForTest })">
            К тесту
        </base-button>
    </div>

</template>


<script>
import BaseButton from "@/components/BaseButton"
import BaseRange from "@/components/BaseRange"
import BaseInput from "@/components/BaseInput"
import { useDeck } from "@/hooks"
import { useRoute } from "vue-router"
import { ref } from "vue"
import { breakpointsMixin } from "@/mixins"

export default {
    components: { BaseButton, BaseRange, BaseInput },
    mixins: [breakpointsMixin],
    async setup() {
        const route = useRoute();
        const deckSlug = route.params.deckSlug;

        const { getStructuredDeck } = useDeck();

        const deck = await getStructuredDeck(deckSlug);
        const cardsNumber = ref(deck.cards.length)
        return {
            cardsNumber
        }
    },

    data() {
        return {
            cardsForTest: this.cardsNumber,
        }
    }


}

</script>


<style lang="scss" scoped>
.testing-settings {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .testing-number {
        label {
            font-size: 1.5em;
            font-weight: bold;
        }

        .input-container {
            display: flex;
            margin-top: 30px;

            .range {
                width: 85%;
                background: none;
            }


            .number {
                width: 15%;
                margin-left: 10px;
                font-size: 1em;
                outline: none;
                padding: 10px 0;
                padding-left: 5px;

            }

        }


    }

    .submit-btn {
        margin-top: 10px;
        font-size: 0.9em;
        padding: 15px 30px;
    }

    &.lg {
        margin: 0 15px;

        .testing-number {
            label {
                font-size: 1.3em;
                text-align: center;
            }
        }
    }

    &.md {

        .testing-number {
            label {
                font-size: 1.1em;
                display: flex;
                justify-content: center;
            }

            .input-container {
                flex-direction: column;

                .range {
                    width: 80%;
                    background: none;
                    margin: 0 auto;
                }

                .number {
                    margin: 0 auto;
                    width: 40%;
                }
            }
        }



    }

}
</style>