import { reactive, ref, watch } from "vue";
import axios from "axios";

const getDeckDetails = async (deckSlug) => {
  const data = await axios.get(`/decks/get/${deckSlug}`).then((res) => {
    const { name, fields } = res.data;
    const dbStructure = {
      front: fields
        .filter((item) => item.side === "front")
        .sort((a, b) => a.position > b.position)
        .map((item) => ({
          ...item,
          type: {
            accessor: item.type,
            name: item.type === "main" ? "Больше" : "Меньше",
          },
        })),
      back: fields
        .filter((item) => item.side === "back")
        .sort((a, b) => a.position > b.position)
        .map((item) => ({
          ...item,
          type: {
            accessor: item.type,
            name: item.type === "main" ? "Больше" : "Меньше",
          },
        })),
    };

    return { name, dbStructure };
  });
  return data;
};

export default async function useDeckSettingsForm(deckSlug) {
  const { dbStructure, name } = await getDeckDetails(deckSlug);

  const setupedDeckName = ref(name);
  const structure = reactive(dbStructure);

  const handleAddFieldClick = (name) => {
    const defaultFields = {
      id: Math.floor(Math.random() * 10000),
      name: "",
      type: {
        name: "Больше",
        accessor: "main",
      },
      fontSize: 24,
    };
    if (structure[name].length < 4) {
      structure[name].push({
        id: defaultFields.id,
        name: defaultFields.name,
        type: defaultFields.type,
        fontSize: defaultFields.fontSize,
      });
    }
  };
  const handleDeleteFieldClick = (name, id) => {
    if (structure[name].length > 1) {
      structure[name] = structure[name].filter((field) => field.id !== id);
    }
  };

  const step = (value) => {
    return value < 28 ? 4 : value < 48 ? 8 : 16;
  };

  const handleAddToFront = () => {
    handleAddFieldClick("front");
  };

  const handleAddToBack = () => {
    handleAddFieldClick("back");
  };

  const handleDeleteFromFront = (id) => {
    handleDeleteFieldClick("front", id);
  };

  const handleDeleteFromBack = (id) => {
    handleDeleteFieldClick("back", id);
  };

  const structureWatcher = (watcher) => {
    return watch(structure, watcher);
  };

  return {
    setupedDeckName,
    structure,
    step,
    handleAddToFront,
    handleAddToBack,
    handleDeleteFromFront,
    handleDeleteFromBack,
    structureWatcher,
  };
}
