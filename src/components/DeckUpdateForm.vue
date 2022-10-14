<template>
  <BaseDeckForm>
    <template v-slot:front>
      <base-input v-for="item in  deck.structure.front" :key="item.id" v-model="item.value" :label="item.name" />
    </template>
    <template v-slot:back>
      <base-input v-for="item in  deck.structure.back" :key="item.id" v-model="item.value" :label="item.name" />
    </template>
    <template v-slot:submit-btn>
      <base-button :isLoading="isLoading" @click.prevent="handleAddClick" class="btn">
        Добавить
      </base-button>
    </template>
  </BaseDeckForm>
</template>

<script>
import BaseInput from "@/components/BaseInput";
import BaseDeckForm from "@/components/BaseDeckForm";
import BaseButton from "@/components/BaseButton"

import { useDeck } from "@/hooks"

export default {
  name: "DeckUpdateForm",
  components: { BaseInput, BaseDeckForm, BaseButton },
  props: {
    deck: {
      required: true,
    },
    clearForm: {
      required: true,
    }
  },

  setup() {

    const { addCardToDeck } = useDeck();
    return { addCardToDeck };
  },

  data() {
    return {
      isLoading: false,
    }
  },

  methods: {
    async handleAddClick() {
      this.isLoading = true;

      const setRequestValue = (side) => {
        return side.map(item => ({ field_id: item.id, value: item.value }))
      }

      const values = setRequestValue(this.deck.structure.front).concat(setRequestValue(this.deck.structure.back));

      const status = await this.addCardToDeck({ deck_id: this.deck.id, values }, this.$route.params.deckSlug);
      if (status) {
        this.clearForm();
      }

      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  font-size: 1em;
  padding: 15px 25px;
  margin-top: 40px;
  display: flex;
  justify-content: center;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: start;

}
</style>