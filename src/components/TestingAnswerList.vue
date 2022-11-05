<template>

    <div class="answers">
        <testing-answer v-for="(answer, index) in current.answers" @answer="(value) => $emit('answer', value)"
            :key="index" :value="answer" :correct="!!current.answered && current.correct_answer === answer"
            :wrong="!!current.answered && current.answered === answer" :disabled="!!current.answered" />
    </div>

</template>


<script>
import TestingAnswer from "@/components/TestingAnswer";

export default {
    components: { TestingAnswer },

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

}
</style>