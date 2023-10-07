<template>
    <div>
        <the-header />

        <Suspense v-if="testSetup && testSetup.examType.accessor === 'quest'">
            <template #default>
                <testing-quest-component class="deck-list" :test-settings="testSetup" />
            </template>
            <template #fallback>
                <div class="loading">
                    <base-loading />
                    <span>Придумываем вопросы</span>
                </div>
            </template>
        </Suspense>

        <Suspense v-else-if="testSetup && testSetup.examType.accessor === 'test'">
            <template #default>
                <testing-test-component class="deck-list" :test-settings="testSetup" />
            </template>
            <template #fallback>
                <div class="loading">
                    <base-loading />
                    <span>Придумываем вопросы</span>
                </div>
            </template>
        </Suspense>
        <Suspense v-else>
            <template #default>
                <TestingSettings class="testing-settings" @submit="(data) => { testSetup = data }" />
            </template>
            <template #fallback>
                <div class="loading">
                    <base-loading />
                    <span>Придумываем вопросы</span>
                </div>
            </template>
        </Suspense>
    </div>
</template>
  
<script>
import TestingTestComponent from "@/components/TestingTestComponent"
import TestingQuestComponent from "@/components/TestingQuestComponent"
import BaseLoading from "@/components/BaseLoading"
import TheHeader from "@/components/TheHeader"
import TestingSettings from "@/components/TestingSettings"


export default {
    components: { TestingTestComponent, TheHeader, BaseLoading, TestingSettings, TestingQuestComponent },
    data() {
        return {
            testSetup: null
        }
    }

}

</script>

<style lang="scss">
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    flex-direction: column;

    span {
        font-weight: bold;
        font-size: 1.5em;
        margin-top: 30px;
    }
}

.testing-settings {
    height: 80vh;
}
</style>
  