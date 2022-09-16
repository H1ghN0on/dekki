<template>
  <div>
    <base-input v-model="data.name" />
    <base-select v-model="data.type" :items="fieldTypes" />
    <base-input
      v-model="data.fontSize"
      :type="'number'"
      :step="step"
      :min="0"
    />
    <b-icon-trash-fill class="icon pointer" @click="onDelete(data.id)" />
  </div>
</template>

<script>
import { BIconTrashFill } from "bootstrap-icons-vue";
import BaseInput from "@/components/BaseInput";
import BaseSelect from "@/components/BaseSelect";

export default {
  name: "DeckSettingsFormField",
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
  },

  data() {
    return {
      fieldTypes: [
        { name: "Больше", accessor: "main" },
        { name: "Меньше", accessor: "secondary" },
      ],
    };
  },

  methods: {
    step(value) {
      return value < 28 ? 4 : value < 48 ? 8 : 16;
    },
  },
  computed: {
    data: {
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

<style>
</style>