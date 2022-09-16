<template>
  <BaseDeckForm>
    <template v-slot:front>
      <DeckSettingsFormSide :name="'front'" v-model="localeStructure.front" />
    </template>
    <template v-slot:back>
      <DeckSettingsFormSide :name="'back'" v-model="localeStructure.back" />
    </template>
  </BaseDeckForm>
</template>

<script>
import BaseDeckForm from "@/components/BaseDeckForm";
import DeckSettingsFormSide from "@/components/DeckSettingsFormSide";

export default {
  name: "DeckSettingsForm",
  components: {
    BaseDeckForm,
    DeckSettingsFormSide,
  },

  props: {
    modelValue: [Object, Number],
  },

  computed: {
    localeStructure: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        this.$emit("update:modelValue", newValue);
      },
    },
  },
};
</script>

<style >
</style>