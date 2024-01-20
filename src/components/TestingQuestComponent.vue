<template>
    <div class="container" :class="breakpoints">
        <deck-update-preview :fixed-side="answering.current.side" :front="dbStructure.front" :back="dbStructure.back"
            class="preview" />

        <div class="quest" v-if="!answering.questCreationLoading">
            <base-progress-bar class="progress-bar" :class="{ 'active': answering.current.answered }"
                :for-watch="answering.current.answered" :fill-time="answering.timeForNextQuestion - 500" :delayTime=".4" />

            <testing-quest-answer class="quest-answer" @answer="onAnswer" :current="answering.current" :timeout="answering.timeForNextQuestion" />

        </div>
        <testing-tools class="tools" :correct="answering.correct.length" :wrong="answering.wrong.length" />
    </div>
</template>


<script>

import DeckUpdatePreview from "@/components/DeckUpdatePreview"
import BaseProgressBar from "@/components/BaseProgressBar"
import TestingTools from "@/components/TestingTools"
import TestingQuestAnswer from "@/components/TestingQuestAnswer"
import { breakpointsMixin } from "@/mixins"
import { useExam } from "@/hooks"

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
        const { answering, onAnswer, dbStructure } = await useExam(props.testSettings, "quest");
        return { answering, onAnswer, dbStructure };
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

        .quest {

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

