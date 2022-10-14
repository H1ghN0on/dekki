<template>

    <div>
        <div @click="saveDeck" v-if="!isSaved" class="save-btn pointer">
            <BIconFileEarmarkFill class="save-btn-icon" />
        </div>
        <div class="container">
            <div class="deck-name-container">
                <div class="deck-name">
                    <base-switchable-input v-model="deckName" :placeholder="'Пусто'" />
                </div>

            </div>
            <div class="form-container">
                <DeckSettingsForm :step="step" :handleAddToFront="handleAddToFront" :handleAddToBack="handleAddToBack"
                    :handleDeleteFromFront="handleDeleteFromFront" :handleDeleteFromBack="handleDeleteFromBack"
                    v-model="structure" class="form" />
                <DeckUpdatePreview :front="preview.front" :back="preview.back" class="preview" />
            </div>
            <div class="table-container">
                <DeckSettingsTable :handleDeleteRow="handleDeleteRow" :headers="headers" :data="data.data" />
            </div>

        </div>
    </div>


</template>
  
<script>
import { BIconFileEarmarkFill } from "bootstrap-icons-vue";
import DeckSettingsForm from "@/components/DeckSettingsForm";
import DeckUpdatePreview from "@/components/DeckUpdatePreview";
import DeckSettingsTable from "@/components/DeckSettingsTable";
import BaseSwitchableInput from "@/components/BaseSwitchableInput"
import { useDeckSettingsForm, useTable, useDeck } from "@/hooks";
import { useRoute } from "vue-router";

export default {
    name: "DeckSettingsPage",
    components: {
        DeckSettingsForm,
        DeckUpdatePreview,
        DeckSettingsTable,
        BaseSwitchableInput,
        BIconFileEarmarkFill
    },

    methods: {
        saveDeck() {
            this.isSaved = true;
            console.log("saved!");
        }
    },


    async setup() {
        const route = useRoute();
        const { getStructuredDeck } = useDeck();
        const deckStructureToTableStructure = (deckStr) => {
            return deckStr.front.concat(deckStr.back).map((item) => ({
                ...item,
                accessor: item.name.toLowerCase() + "_" + item.id,
            }));
        }

        const { name, dbStructure, cards } = await getStructuredDeck(route.params.deckSlug, (item) => ({
            ...item,
            type: {
                accessor: item.type,
                name: item.type === "main" ? "Больше" : "Меньше",
            }
        }));


        const {
            setupedDeckName,
            structure,
            handleAddToFront,
            handleAddToBack,
            handleDeleteFromFront,
            handleDeleteFromBack,
            step,
            structureWatcher,
        } = await useDeckSettingsForm(name, dbStructure);

        const {
            updateStructure,
            data,
            headers,
            handleDeleteRow
        } = useTable(deckStructureToTableStructure(structure), cards);

        structureWatcher((newValue) => {
            const newStructure = deckStructureToTableStructure(newValue);
            updateStructure(newStructure);
        })

        return {
            handleAddToFront,
            handleAddToBack,
            handleDeleteFromFront,
            handleDeleteFromBack,
            structure,
            data,
            headers,
            step,
            handleDeleteRow,
            setupedDeckName
        };
    },



    data() {
        return {
            deckName: this.setupedDeckName,
            isSaved: false,
        }
    },

    computed: {
        preview() {
            return {
                front: this.structure.front.map((item) => ({
                    ...item,
                    type: item.type.accessor,
                    value: item.name
                })),
                back: this.structure.back.map((item) => ({
                    ...item,
                    type: item.type.accessor,
                    value: item.name
                })),
            }
        }
    },
};
</script>
  
<style lang="scss" scoped>
.loading {
    font-size: 5em;
    font-weight: bold;
}

.save-btn {
    position: fixed;
    font-size: 1.5em;
    bottom: 50px;
    right: 50px;
    z-index: 1000;
    background: $primary-text;
    border-radius: 50%;
    padding: 15px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;

    .save-btn-icon {
        fill: white;
    }
}

.container {
    .deck-name-container {
        width: 100%;
        align-self: start;
        font-size: 3em;
        font-weight: bold;


        .deck-name {
            max-width: 100%;
            padding-left: 30px;
            padding-right: 30px;
            word-break: normal;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 80px);
    padding: 40px 0;

    .form-container {
        margin-top: 30px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        justify-content: space-between;

        .form {
            width: 45vw;
        }

        .preview {
            width: 35vw;
            margin-right: 30px;
        }
    }

    .table-container {
        width: 90%;
        margin-top: 100px;
    }
}
</style>