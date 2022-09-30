import { reactive } from "vue";

export default function useDeckSettingsForm(dbStructure) {
  const structure = reactive(dbStructure);

  const handleAddFieldClick = (name) => {
    const defaultFields = {
      id: Math.floor(Math.random() * 10000),
      name: "",
      type: {
        name: "Больше",
        accessor: "main",
      },
      fontSize: 8,
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

  return {
    structure,
    step,
    handleAddToFront,
    handleAddToBack,
    handleDeleteFromFront,
    handleDeleteFromBack,
  };
}
