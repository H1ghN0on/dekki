<template>

  <the-header />
  <Suspense>
    <template #default>
      <DeckSettingsComponents />
    </template>
    <template #fallback>
      <div class="loading">
        <base-loading />
      </div>
    </template>
  </Suspense>

</template>

<script>

import DeckSettingsComponents from "@/components/DeckSettingsComponent"
import TheHeader from "@/components/TheHeader"
import BaseLoading from "@/components/BaseLoading"
export default {
  components: {
    TheHeader,
    DeckSettingsComponents,
    BaseLoading
  }
}

</script>

<style>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
</style>