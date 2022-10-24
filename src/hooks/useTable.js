import { reactive, computed, watch, ref } from "vue";
import {
  renameKeys,
  findDifferentObjectsIndicesInArrays,
} from "@/utils/ObjectUtils";

export default function useTable(rawStructure, rawData) {
  const tableDataForSave = ref([]);

  const data = reactive({
    data: rawData.map((card) => {
      let obj = {};

      card.values.forEach((item) => {
        obj[item.field.name] = item;
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
    const newKeys = headers.value.map((item) => item.accessor);

    const keys = Object.keys(row);

    const obj = {};

    const realKeysFromNew = newKeys.map((item) =>
      item.split("_").slice(0, -1).join("").toLowerCase()
    );

    keys.forEach((element) => {
      const id = realKeysFromNew.indexOf(element.toLowerCase());
      if (id !== -1) {
        obj[element] = newKeys[id];
      }
    });

    return renameKeys(row, obj);
  });

  const onStructureNameChange = (oldValue, newValue) => {
    const indices = findDifferentObjectsIndicesInArrays(oldValue, newValue, [
      "accessor",
    ]);
    for (let index of indices) {
      data.data = data.data.map((item) => {
        return renameKeys(item, {
          [oldValue[index].accessor]: newValue[index].accessor,
        });
      });
    }
  };

  const onStructureFieldAdd = (oldValue, newValue) => {
    const intersection = newValue.filter(
      ({ id: id1 }) => !oldValue.some(({ id: id2 }) => id2 === id1)
    );
    if (intersection.length) {
      data.data = data.data.map((item) => ({
        ...item,
        [intersection[0].accessor]: {
          id: Math.floor(Math.random() * 10000),
          value: "",
        },
      }));
    }
  };

  const onStructureFieldRemove = (oldValue, newValue) => {
    const intersection = oldValue.filter(
      ({ id: id1 }) => !newValue.some(({ id: id2 }) => id2 === id1)
    );

    if (intersection.length) {
      data.data = data.data.filter((item) => {
        delete item[intersection[0].accessor];
        return item;
      });
    }
  };

  watch(headers, (newValue, oldValue) => {
    if (newValue.length === oldValue.length) {
      onStructureNameChange(oldValue, newValue);
    } else if (newValue.length > oldValue.length) {
      onStructureFieldAdd(oldValue, newValue);
    } else {
      onStructureFieldRemove(oldValue, newValue);
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
    tableDataForSave,
  };
}
