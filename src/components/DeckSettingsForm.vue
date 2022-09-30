<template>
  <BaseDeckForm>
    <template v-slot:front>
      <DeckSettingsFormSide :addField="handleAddToFront" :deleteField="handleDeleteFromFront" :name="'front'"
        :step="step" v-model="localModelValue.front" />
    </template>
    <template v-slot:back>
      <DeckSettingsFormSide :addField="handleAddToBack" :deleteField="handleDeleteFromBack" :name="'back'" :step="step"
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
    step: {
      type: Function,
      required: true,
    }
  },
};
</script>

<style >

</style>