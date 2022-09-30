<template>
  <div>
    <base-input v-model="localModelValue.name" />
    <base-select v-model="localModelValue.type" :items="fieldTypes" />
    <base-input v-model="localModelValue.fontSize" :type="'number'" :step="step" :min="0" />
    <b-icon-trash-fill class="icon pointer" @click="onDelete(localModelValue.id)" />
  </div>
</template>

<script>
import { BIconTrashFill } from "bootstrap-icons-vue";
import BaseInput from "@/components/BaseInput";
import BaseSelect from "@/components/BaseSelect";
import { localModelValueMixin } from "@/mixins";

export default {
  name: "DeckSettingsFormField",
  mixins: [localModelValueMixin],
  components: {
    BIconTrashFill,
    BaseInput,
    BaseSelect,
  },
  props: {
    modelValue: {
      type: [Object, Number],
      required: true,
    },
    onDelete: {
      type: Function,
      required: true,
    },
    step: {
      type: Function,
      require: true,
    }
  },

  data() {
    return {
      fieldTypes: [
        { name: "Больше", accessor: "main" },
        { name: "Меньше", accessor: "secondary" },
      ],
    };
  },
};
</script>

<style>

</style>