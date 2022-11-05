<template>

    <div class="tools">
        <base-button @click="$emit('end')" class="end-btn">Завершить</base-button>
        <div class="counter correct">
            <span class="counter-value">{{ correct }}</span>
        </div>
        <div class="counter wrong"><span class="counter-value">{{ wrong }}</span></div>
    </div>

</template>


<script>
import BaseButton from '@/components/BaseButton';

export default {
    components: { BaseButton },
    props: {
        correct: { type: Number, required: true },
        wrong: { type: Number, required: true }
    }
}

</script>


<style lang="scss" scoped>
.tools {
    display: flex;

    &>div {
        margin-left: 30px;
    }

    & :first-child {
        margin-left: 0;
    }

    .end-btn {
        font-size: 1em;
        padding: 10px 20px;
    }

    .counter {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        width: 50px;
        height: 50px;
        color: white;
        font-size: 1.3em;
        font-weight: bold;


        &.correct {
            background: $correct;
        }

        &.wrong {
            background: $wrong;
        }

        .counter-value {
            position: relative;
            bottom: 2px;
        }
    }
}
</style>