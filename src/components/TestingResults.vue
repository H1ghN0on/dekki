<template>
    <base-dialog class="results" :show="true">
        <div class="title">Результаты</div>
        <div class="info">
            <testing-results-item :progress="65" :name="'日本'" />
            <testing-results-item :progress="33" :name="'日本'" />
            <testing-results-item :progress="21" :name="'日本'" />
            <testing-results-item :progress="85" :name="'日本'" />
            <testing-results-item :progress="0" :name="'日本'" />
            <testing-results-item :progress="32" :name="'日本'" />
            <testing-results-item :progress="64" :name="'日本'" />
            <testing-results-item :progress="49" :name="'日本'" />
            <testing-results-item :progress="2" :name="'日本'" />
            <testing-results-item :progress="76" :name="'日本'" />
        </div>
        <base-button class="btn">Продолжить</base-button>
    </base-dialog>
</template>


<script>

import BaseDialog from "@/components/BaseDialog";
import BaseButton from "@/components/BaseButton";
import TestingResultsItem from "@/components/TestingResultsItem";


export default {
    components: { BaseDialog, BaseButton, TestingResultsItem },
}


</script>

<style scoped lang="scss">
.results {
    display: flex;
    flex-direction: column;
    align-items: center;


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
}
</style>