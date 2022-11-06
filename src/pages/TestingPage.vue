<template>
    <div>
        <the-header />
        <Suspense>
            <template #default>
                <testing-component class="deck-list" />
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
import TestingComponent from "@/components/TestingComponent"
import BaseLoading from "@/components/BaseLoading"
import TheHeader from "@/components/TheHeader"


export default {
    components: { TestingComponent, TheHeader, BaseLoading }
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
</style>
  