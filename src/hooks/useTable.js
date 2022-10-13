import { reactive, computed, watch } from "vue";
import {
  renameKeys,
  findDifferentObjectsIndicesInArrays,
} from "@/utils/ObjectUtils";

export default function useTable(rawStructure, rawData) {
  const data = reactive({
    data: rawData.map((card) => {
      let obj = {};
      card.values.forEach((item) => {
        obj[item.field.name] = item.value;
      });
      return obj;
    }),

    structure: rawStructure,
  });

  const headers = computed(() =>
    data.structure.map((item) => ({
      ...item,
      width: 12,
      initWidth: 12,
      accessor:
        (item.name ? item.name.toLowerCase() + "_" : "empty_") + item.id,
    }))
  );

  //конечно по-уродски выглядит
  data.data = data.data.map((row) => {
    const keys = Object.keys(row);
    const newKeys = headers.value.map((item) => item.accessor);
    let obj = {};
    keys.forEach((element, index) => {
      obj[element] = newKeys[index];
    });
    return renameKeys(row, obj);
  });

  watch(headers, (newValue, oldValue) => {
    if (newValue.length === oldValue.length) {
      const indices = findDifferentObjectsIndicesInArrays(oldValue, newValue, [
        "accessor",
      ]);
      for (let index of indices) {
        data.data = data.data.map((item) =>
          renameKeys(item, {
            [oldValue[index].accessor]: newValue[index].accessor,
          })
        );
      }
    }
  });

  const updateStructure = (newStructure) => {
    data.structure = newStructure;
  };

  const handleDeleteRow = (id) => {
    data.data = data.data.filter((row, index) => index !== id);
  };

  return {
    data,
    headers,
    updateStructure,
    handleDeleteRow,
  };
}
