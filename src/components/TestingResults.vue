<template>
    <base-dialog class="results" :show="active"
        :class="{ 'lg': $store.getters.lgScreen, 'md': $store.getters.mdScreen, 'sm': $store.getters.smScreen, 'xs': $store.getters.xsScreen }">
        <div class="title">Результаты</div>
        <div class="info">
            <testing-results-item v-for="result in results" :key="result.id"
                :progress="Math.floor(result.correct / result.count * 100)" :name="result.values[0].value" />
        </div>
        <router-link to="/decks">
            <base-button class="btn">Продолжить</base-button>
        </router-link>

    </base-dialog>
</template>


<script>

import BaseDialog from "@/components/BaseDialog";
import BaseButton from "@/components/BaseButton";
import TestingResultsItem from "@/components/TestingResultsItem";


export default {
    components: { BaseDialog, BaseButton, TestingResultsItem },

    props: {
        active: { type: Boolean, required: true },
        correct: { type: Array, required: true, },
        wrong: { type: Array, required: true, }
    },

    data() {
        return {
            results: [],
        }
    },


    watch: {
        correct: {
            deep: true,
            handler(newValue) {
                const newItem = newValue[newValue.length - 1];
                const id = this.results.findIndex(item => item.id === newItem.id);
                if (id !== -1) {
                    this.results[id].count++;
                    this.results[id].correct++;
                } else {
                    this.results.push({ ...newItem, count: 1, correct: 1, wrong: 0 });

                }
            }
        },
        wrong: {
            deep: true,
            handler(newValue) {
                const newItem = newValue[newValue.length - 1];
                const id = this.results.findIndex(item => item.id === newItem.id);
                if (id !== -1) {
                    this.results[id].count++;
                    this.results[id].wrong++;
                } else {
                    this.results.push({ ...newItem, count: 1, wrong: 1, correct: 0 });

                }
            },
        }


    }
}


</script>

<style scoped lang="scss">
.results {
    display: flex;
    flex-direction: column;
    align-items: center;

    ::v-deep {
        .dialog__content {
            width: 60vw;
        }
    }

    .title {
        text-align: center;
        font-size: 1.5em;
        font-weight: bold;
    }

    .info {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        padding: 30px;
        overflow: scroll;
        overflow-x: hidden;
        max-height: 83%;

        border: 1px solid $progress-bar-background;


        &>.item {
            margin-top: 30px;
        }

        & :first-child {
            margin-top: 0;
        }


    }

    .btn {
        font-size: 0.9em;
        padding: 10px 35px;
        display: flex;
        margin: 0 auto;
        margin-top: 20px;
    }

    &.md {
        ::v-deep {
            .dialog__content {
                width: 90vw;
            }
        }
    }

}
</style>