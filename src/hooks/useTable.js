import { reactive, computed, onMounted, watch } from "vue";
import {
  renameKeys,
  findDifferentObjectsIndicesInArrays,
} from "@/utils/ObjectUtils";

export default function useTable(rawStructure, rawData) {
  const data = reactive({ data: rawData, structure: rawStructure });

  const headers = computed(() =>
    data.structure.map((item) => ({
      ...item,
      width: 12,
      initWidth: 12,
      accessor:
        (item.name ? item.name.toLowerCase() + "_" : "empty_") + item.id,
    }))
  );

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

  onMounted(() => {
    data.data = data.data.map((row) => {
      const keys = Object.keys(row);
      const newKeys = headers.value.map((item) => item.accessor);
      let obj = {};
      keys.forEach((element, index) => {
        obj[element] = newKeys[index];
      });
      return renameKeys(row, obj);
    });
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
