<template>

    <div class="answers" :class="breakpoints">
        <testing-answer v-for="(answer, index) in current.answers" @answer="(value) => $emit('answer', value)"
            :key="index" :value="answer" :correct="!!current.answered && current.correct_answer === answer"
            :wrong="!!current.answered && current.answered === answer" :disabled="!!current.answered" />
    </div>

</template>


<script>
import TestingAnswer from "@/components/TestingAnswer";
import { breakpointsMixin } from "@/mixins";

export default {
    components: { TestingAnswer },
    mixins: [breakpointsMixin],
    props: {
        current: {
            type: Object,
            required: true,
        }
    }

}
</script>


<style scoped lang="scss">
.answers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 50px;

    justify-items: center;
    grid-auto-flow: dense;


    &.lg {
        grid-template-columns: 1fr;
    }

    &.md {

        grid-template-columns: 1fr 1fr;
        grid-gap: 10px;
    }

    &.sm {
        grid-template-columns: 1fr;
    }
}
</style>