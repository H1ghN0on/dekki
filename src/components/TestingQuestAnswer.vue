<template>
    <div class="quest-input">
        <base-input v-model="answerInput" :label="'Введите ответ'" />
        <div class="quest-submit">
            <base-button class="quest-submit-btn" :class="{
                'correct': isCorrect,
                'wrong': isWrong
            }" @click="$emit('answer', answerInput)" :disabled="!!current.answered">Продолжить</base-button>
            <div class="quest-hint" v-if="isWrong">
                Неправильно, верный ответ: {{ correctAnswers }}
            </div>
        </div>
    </div>
</template>

<script>

import BaseInput from "@/components/BaseInput"
import BaseButton from "@/components/BaseButton"
import { breakpointsMixin } from "@/mixins";

export default {
    components: { BaseInput, BaseButton },
    mixins: [breakpointsMixin],
    props: {
        current: {
            type: Object,
            required: true,
        }
    },

    computed: {
        isCorrect() {
            return !!this.current.answered && this.current.answers.includes(this.answerInput);
        },
        isWrong() {
            return !!this.current.answered && !this.current.answers.includes(this.answerInput);
        },
        correctAnswers() {
            let answers = "";
            this.current.answers.map(item => {
                answers = answers.concat(`${item}, `)
            })
            answers = answers.slice(0, -2);
            return answers;
        },
    },

    data() {
        return {
            answerInput: ""
        }
    }

}
</script>


<style scoped lang="scss">
.quest-input {

    .quest-submit {
        display: flex;
        align-items: center;
        margin-top: 20px;

        .quest-submit-btn {
            width: 155px;
            height: 50px;
            font-size: 1em;
            padding: 5px 10px;
            transition: background 0.2s;

            &.wrong {
                background: $wrong;
            }

            &.correct {
                background: $correct;
            }
        }

        .quest-hint {
            margin-left: 20px;
            font-weight: bold;
            font-size: 1.3em;
        }
    }

}
</style>