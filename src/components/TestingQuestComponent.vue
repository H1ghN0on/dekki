<template>
    <div class="container" :class="breakpoints">
        <deck-update-preview :fixed-side="quest.current.side" :front="dbStructure.front" :back="dbStructure.back"
            class="preview" />

        <div class="quest" v-if="!quest.questCreationLoading">
            <base-progress-bar class="progress-bar" :class="{ 'active': quest.current.answered }"
                :for-watch="quest.current.answered" :fill-time="quest.timeForNextQuestion - 500" :delayTime=".4" />

            <testing-quest-answer class="quest-answer" @answer="onAnswer" :current="quest.current" />

        </div>
        <testing-tools class="tools" :correct="quest.correct.length" :wrong="quest.wrong.length" />
    </div>
</template>


<script>

import DeckUpdatePreview from "@/components/DeckUpdatePreview"
import BaseProgressBar from "@/components/BaseProgressBar"
import TestingTools from "@/components/TestingTools"
import TestingQuestAnswer from "@/components/TestingQuestAnswer"
import { breakpointsMixin } from "@/mixins";
import { useQuest, useDeck } from "@/hooks"
import { useRoute } from "vue-router"

export default {
    mixins: [breakpointsMixin],
    components: {
        DeckUpdatePreview, BaseProgressBar, TestingTools, TestingQuestAnswer
    },

    props: {
        testSettings: {
            required: true,
            type: Object,
        }
    },

    data() {
        return { isEndPhase: false, answerInput: "" }
    },

    async setup(props) {

        const updateCardPreview = (item) => {
            console.log("snova tut");
            const card = quest.current.card.values.find(value => value.field.name === item.name);
            return {
                ...item,
                value: card.value
            }
        }

        const route = useRoute();
        const deckSlug = route.params.deckSlug;
        const { quest, createQuest, onAnswer, questWatcher } = await useQuest(deckSlug);

        await createQuest(props.testSettings);
        const { getStructuredDeck } = useDeck(deckSlug);
        const { dbStructure } = await getStructuredDeck(deckSlug, updateCardPreview);

        questWatcher(() => {
            dbStructure.front = dbStructure.front.map(updateCardPreview);
            dbStructure.back = dbStructure.back.map(updateCardPreview);
        })

        return { quest, dbStructure, onAnswer, createQuest };
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

    .quest {
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

        .quest-submit {
            display: flex;
            align-items: center;
            margin-top: 20px;

            .quest-submit-btn {
                width: 155px;
                height: 50px;
                font-size: 1em;
                padding: 5px 10px;
            }

            .quest-hint {
                margin-left: 20px;
                font-weight: bold;
                font-size: 1.3em;
            }
        }

    }

    .tools {
        position: absolute;
        bottom: 40px;
        right: 40px;
        z-index: 10000;
    }


}
</style>

