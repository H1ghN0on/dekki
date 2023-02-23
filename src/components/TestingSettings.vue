<template>
    <div class="testing-settings" :class="breakpoints">
        <div class="testing-box">
            <div class="testing-setting testing-number">
                <label>Количество карточек для тестирования (с конца)</label>
                <div class="input-container">
                    <base-range v-model="testSettings.cardsForTest" :min="4" :max="cardsNumber" />
                    <base-input v-model="testSettings.cardsForTest" class="number" type="number" :min="4"
                        :max="cardsNumber" />
                </div>
            </div>
            <div class="testing-setting testing-is-exam inline">
                <label>Режим экзамена</label>
                <div class="input-container">
                    <base-checkbox v-model="testSettings.isExam" />
                </div>

            </div>
        </div>
        <base-button class="submit-btn" @click="$emit('submit', testSettings)">
            К тесту
        </base-button>

    </div>
</template>

<script>




import BaseButton from "@/components/BaseButton"
import BaseRange from "@/components/BaseRange"
import BaseInput from "@/components/BaseInput"
import BaseCheckbox from "@/components/BaseCheckbox"
import { useDeck } from "@/hooks"
import { useRoute } from "vue-router"
import { ref } from "vue"
import { breakpointsMixin } from "@/mixins"

export default {
    components: { BaseButton, BaseRange, BaseInput, BaseCheckbox },
    mixins: [breakpointsMixin],
    async setup() {
        const route = useRoute();
        const deckSlug = route.params.deckSlug;

        const { getRawDeck } = useDeck();

        const deck = await getRawDeck(deckSlug);
        const cardsNumber = ref(deck.cards_number);
        return {
            cardsNumber
        }
    },



    data() {
        return {
            testSettings: {
                cardsForTest: this.cardsNumber,
                isExam: false,
            }

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

    .testing-box {
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .testing-setting {
        &.inline {
            display: flex;
            align-items: center;

            .input-container {
                margin-top: 0;
                margin-left: 15px;
            }
        }

        label {
            font-size: 1.5em;
            font-weight: bold;
        }

        .input-container {
            display: flex;
            margin-top: 20px;

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