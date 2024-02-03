<template>
  <div class="card-wrapper">
    <div class="card">
      <div class="info">
        <div class="info-item name">{{ deck.name }}</div>
        <div class="info-item cards-number">Карточек: {{ deck.cards_number }}</div>
      </div>
      <div class="test-btn">
        <router-link :to="'/testing/' + deck.slug">
          <base-button class="btn" :class="{ 'disabled': isTestAvailable }" :disabled="isTestAvailable">
            {{ isTestAvailable ? "Минимум 4 карты для теста" : "Тест" }} </base-button>
        </router-link>
        <base-button v-show="$store.getters.mdScreen" @click="toggleSettings" class="btn settings-btn">Настройки
        </base-button>
      </div>
    </div>

    <div class="card-settings" :class="{ 'card-settings-active': isCardSettingsActive }">

      <!-- Add to deck button -->
      <router-link :to="'/update/' + deck.slug">
        <b-icon-plus-circle-fill class="card-settings-item add pointer" />
      </router-link>

      <!-- Settings button-->
      <router-link :to="'/settings/' + deck.slug">
        <b-icon-gear-fill class="card-settings-item settings pointer" />
      </router-link>

      <!-- Save PDF button -->
      <b-icon-file-earmark-pdf-fill v-if="!isLoading.savePDF" class="card-settings-item pdf pointer" @click="onPDF"/>
      <base-loading v-else :width="35" :height="35" :borderWidth=1
        class="card-settings-item remove loading" />

      <!-- Remove button -->
      <b-icon-trash3-fill v-if="!isLoading.remove" @click="onRemove" class="card-settings-item remove pointer" />
      <base-loading v-else :width="35" :height="35" :borderWidth=1 :color="'red'"
        class="card-settings-item remove loading" />

    </div>
  </div>
</template>

<script>

import BaseButton from "@/components/BaseButton";
import BaseLoading from "@/components/BaseLoading";
import { BIconPlusCircleFill, BIconTrash3Fill, BIconGearFill, BIconFileEarmarkPdfFill } from "bootstrap-icons-vue";
import { useToast } from "vue-toastification";
import { Api } from "@/api"
import { usePDF, useDeckSettingsForm, useDeck, useTable } from "@/hooks"
export default {
  components: {
    BIconPlusCircleFill,
    BIconTrash3Fill,
    BIconGearFill,
    BaseButton,
    BaseLoading,
    BIconFileEarmarkPdfFill
  },
  props: {
    deck: {
      type: Object,
      required: true,
    },

  },
  data() {
    return {
      isLoading: {
        savePDF: false,
        remove: false,
      },
      isCardSettingsActive: false,
    }
  },

  async setup() {
    const toast = useToast();
    const { makeDeckInfoDocument, save } = usePDF();

    return { toast, makeDeckInfoDocument, save };
  },

  computed: {
    isTestAvailable() {
      return this.deck.cards_number < 4;
    }
  },

  methods: {
    async onRemove() {

      if (!confirm(`Вы точно хотите удалить колоду ${this.deck.name}?`))
        return;

      this.isLoading.remove = true;
      const [e] = await Api().removeDeck(this.deck.slug);
      if (e) {
        this.toast.error(`Ошибка случилась`, {
          timeout: 2000,
        });

      } else {
        this.$emit('remove', this.deck.slug)
      }
      this.isLoading.remove = false;
    },

    toggleSettings() {
      this.isCardSettingsActive = !this.isCardSettingsActive
    },

    async onPDF() {
      this.isLoading.savePDF = true;
      const deckSlug = this.deck.slug;

      const { getStructuredDeck } = useDeck();


      const getDeck = async () => {
          const data = await getStructuredDeck(deckSlug, (item) => ({
              ...item,
              type: {
                  accessor: item.type,
                  name: item.type === "main" ? "Больше" : "Меньше",
              }
          }));
          return data;
      }
      const deckStructureToTableStructure = (deckStr) => {
          return deckStr.front.concat(deckStr.back).map((item) => ({
              ...item,
              accessor: item.name.toLowerCase() + "_" + item.id,
          }));
      }

      const { name, dbStructure, cards } = await getDeck();

      const { structure } = await useDeckSettingsForm(name, dbStructure);

      const {
          data,
          headers,
      } = useTable(deckStructureToTableStructure(structure), cards);

      const document = this.makeDeckInfoDocument(this.deck.name, this.deck.cards_number, headers.value, data.data);
      
      this.save(document, deckSlug);

      this.isLoading.savePDF = false;
    }
  }



};
</script>

<style lang="scss" scoped>
.card-wrapper {
  position: relative;
  width: 100%;
}

.card {
  position: relative;

  background: white;
  padding: 20px 30px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  border-radius: 10px;
  width: 100%;

  .info {
    text-align: center;
    width: 100%;

    .name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      font-size: 2em;
      font-weight: bold;
    }

    .cards-number {
      margin-top: 10px;
      font-size: 1em;
    }
  }

  .test-btn {
    margin-top: 50px;

    .btn {
      width: 100%;
      font-size: 1em;
      padding: 10px;

      &.disabled {
        background: dimgrey;
      }
    }

    .settings-btn {
      margin-top: 10px;
    }
  }

}

.card-settings {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 2px;
  z-index: 100;
  width: 90%;
  background: white;
  display: flex;
  justify-content: space-between;
  border: 2px solid #c0c0c0;
  border-radius: 0 0 10px 10px;
  border-top: none;
  padding: 0 30px;


  max-height: 0;
  transition: .2s ease-in;

  overflow: hidden;
  opacity: 0;

  .card-settings-item {
    font-size: 1.5em;

    &.remove {
      color: $danger-text;

      &.loading {
        position: relative;
        bottom: 5px;
        left: 5px;
      }
    }
  }
}

.card-settings:hover,
.card:hover+.card-settings,
.card-settings-active {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  max-height: 50px;
  opacity: 1;
  padding: 10px 30px;
  transition: .2s ease-out;
}
</style>