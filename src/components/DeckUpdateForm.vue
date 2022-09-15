<template>
  <BaseDeckForm>
    <template v-slot:front>
      <base-input
        v-for="item in front"
        :key="item.id"
        v-model="item.value"
        :label="item.name"
      />
    </template>
    <template v-slot:back>
      <base-input
        v-for="item in back"
        :key="item.id"
        v-model="item.value"
        :label="item.name"
      />
    </template>
  </BaseDeckForm>
</template>

<script>
import BaseInput from "@/components/BaseInput";
import BaseDeckForm from "@/components/BaseDeckForm";
export default {
  name: "DeckUpdateForm",
  components: { BaseInput, BaseDeckForm },
  props: {
    front: {
      type: Array,
      required: true,
    },
    back: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>