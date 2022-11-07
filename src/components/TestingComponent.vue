<template>
    <div class="container" :class="breakpoints">
        <testing-results :active="isEndPhase" :correct="testing.correct" :wrong="testing.wrong" />
        <deck-update-preview :fixed-side="testing.current.side" :front="dbStructure.front" :back="dbStructure.back"
            class="preview" />
        <div class="testing" v-if="!testing.testCreationLoading">
            <base-progress-bar class="progress-bar" :class="{ 'active': testing.current.answered }"
                :for-watch="testing.current.answered" :fill-time="testing.timeForNextQuestion - 500" :delayTime=".4" />
            <testing-answer-list @answer="onAnswer" class="answers" :current="testing.current" />
        </div>
        <div class="loading" v-else>
            <base-loading />
            <span>Больше вопросов</span>
        </div>

        <testing-tools class="tools" @end="isEndPhase = true" :correct="testing.correct.length"
            :wrong="testing.wrong.length" />
    </div>
</template>


<script>

import TestingTools from "@/components/TestingTools"
import DeckUpdatePreview from "@/components/DeckUpdatePreview"
import TestingAnswerList from "@/components/TestingAnswerList"
import BaseProgressBar from "@/components/BaseProgressBar"
import BaseLoading from "@/components/BaseLoading";
import TestingResults from "@/components/TestingResults";
import { useTest, useDeck } from "@/hooks"
import { useRoute } from "vue-router"
import { breakpointsMixin } from "@/mixins";

export default {
    mixins: [breakpointsMixin],
    components: {
        DeckUpdatePreview, TestingAnswerList, TestingTools, BaseProgressBar, BaseLoading, TestingResults,
    },

    data() {
        return { isEndPhase: false, }
    },

    async setup() {

        const updateCardPreview = (item) => {
            const card = testing.current.card.values.find(value => value.field.name === item.name);
            return {
                ...item,
                value: card.value
            }
        }

        const route = useRoute();
        const deckSlug = route.params.deckSlug;
        const { testing, createTest, onAnswer, testingWatcher } = await useTest(deckSlug);

        await createTest();
        const { getStructuredDeck } = useDeck(deckSlug);
        const { dbStructure } = await getStructuredDeck(deckSlug, updateCardPreview);

        testingWatcher(() => {

            dbStructure.front = dbStructure.front.map(updateCardPreview);
            dbStructure.back = dbStructure.back.map(updateCardPreview);
        })

        return { testing, dbStructure, onAnswer, createTest };
    },


}
</script>


<style scoped lang="scss">
@keyframes fadeIn {
    0% {
        transform: scale(0.4);
        opacity: 0;

    }

    50% {
        transform: scale(1.25);
    }

    100% {
        opacity: 1;
        transform: scale(1.0);

    }
}

@keyframes fadeOut {
    0% {
        opacity: 1;

    }

    100% {
        opacity: 0;

    }
}



.container {
    width: 100vw;
    height: calc(100vh - 80px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 0;

    .preview {
        width: 35vw;
        margin-left: 30px;

    }

    .loading {
        width: 65vw;
    }

    .testing {
        width: 65vw;
        padding: 40px;

        .progress-bar {
            position: relative;
            bottom: 80px;
            width: 80%;
            margin: 0 auto;
            opacity: 0;
            visibility: hidden;
            transition: none;

            &.active {
                opacity: 1;
                visibility: visible;
                transition: opacity .5s;
            }
        }
    }


    .tools {
        position: absolute;
        bottom: 40px;
        right: 40px;
        z-index: 10000;
    }

    &.lg {

        .preview {
            width: 55vw;
        }

        .testing {
            width: 45vw;
        }
    }

    &.md {
        flex-direction: column;
        padding-top: 0;

        .preview {
            width: 60vw;
            order: 1;
            margin-left: 0;
        }

        .testing {

            order: 2;
            width: 100vw;

            .progress-bar {
                display: none;
            }

        }

        .tools {
            position: static;
            padding: 20px 0;
        }
    }

    &.sm {




        .preview {
            width: 80vw;

        }



    }
}
</style>

