<template>
    <base-button :disabled="disabled" @click="$emit('answer', value)" class="answer"
        :class="{ 'correct': this.correct, 'wrong': this.wrong }">
        <div class="content">
            <span>
                {{ value }}
            </span>
        </div>
    </base-button>
</template>


<script>
import BaseButton from "@/components/BaseButton"

export default {
    components: { BaseButton },

    props: {
        value: { type: String, required: true },
        correct: Boolean,
        wrong: Boolean,
        disabled: Boolean,
    },

}

</script>

<style scoped lang="scss">
.answer {
    font-size: 1.2em;
    width: 80%;
    transition: background .1s;
    max-height: 150px;
    padding: 15px;


    .content {
        height: 100%;
        overflow-y: auto;
        scrollbar-width: thin;
        padding: 0 10px;
    }

    &.wrong {
        background: $wrong;
    }

    &.correct {
        background: $correct;
    }
}
</style>