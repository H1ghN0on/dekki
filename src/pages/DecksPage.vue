<template>
  <div>
    <the-header />
    <Suspense>
      <template #default>
        <decks-component class="deck-list"
          :class="{ 'lg': $store.getters.lgScreen, 'md': $store.getters.mdScreen, 'sm': $store.getters.smScreen, 'xs': $store.getters.xsScreen }" />
      </template>
      <template #fallback>
        <div class="loading">
          <base-loading />
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import BaseLoading from "@/components/BaseLoading";
import DecksComponent from "@/components/DecksComponent";

export default {
  name: "DecksPage",
  components: {
    TheHeader,
    DecksComponent,
    BaseLoading
  },

};
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.deck-list {
  width: 70vw;
  margin: 0 auto;
  margin-top: 90px;

  &.lg {
    margin-top: 50px;
    width: 80vw;
  }

  &.md {
    width: 90vw;
  }
}
</style>
