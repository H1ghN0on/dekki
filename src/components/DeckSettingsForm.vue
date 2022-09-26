<template>
  <BaseDeckForm>
    <template v-slot:front>
      <DeckSettingsFormSide :addField="handleAddToFront" :deleteField="handleDeleteFromFront" :name="'front'"
        v-model="localModelValue.front" />
    </template>
    <template v-slot:back>
      <DeckSettingsFormSide :addField="handleAddToBack" :deleteField="handleDeleteFromBack" :name="'back'"
        v-model="localModelValue.back" />
    </template>
  </BaseDeckForm>
</template>

<script>
import { localModelValueMixin } from "@/mixins";
import BaseDeckForm from "@/components/BaseDeckForm";
import DeckSettingsFormSide from "@/components/DeckSettingsFormSide";

export default {
  name: "DeckSettingsForm",
  mixins: [localModelValueMixin],
  components: {
    BaseDeckForm,
    DeckSettingsFormSide,
  },
  props: {
    handleAddToFront: {
      type: Function,
      required: true,
    },
    handleAddToBack: {
      type: Function,
      required: true,
    },
    handleDeleteFromFront: {
      type: Function,
      required: true,
    },
    handleDeleteFromBack: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style >

</style>