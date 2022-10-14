<template>
  <the-header />
  <Suspense>
    <template #default>
      <DeckUpdateComponent />
    </template>
    <template #fallback>
      <div class="loading">
        <base-loading />
      </div>

    </template>
  </Suspense>

</template>

<script>
import TheHeader from "@/components/TheHeader";
import DeckUpdateComponent from "@/components/DeckUpdateComponent";
import BaseLoading from "@/components/BaseLoading";

export default {
  name: "DeckUpdatePage",
  components: {
    TheHeader,
    BaseLoading,
    DeckUpdateComponent
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
</style>