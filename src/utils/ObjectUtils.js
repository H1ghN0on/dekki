export const renameKeys = (obj, newKeys) => {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
};

export const findDifferentObjectsIndicesInArrays = (
  array1,
  array2,
  fields = []
) => {
  const values1 = Object.values(array1);
  const values2 = Object.values(array2);
  let indices = [];
  values1.forEach((item, index) => {
    if (item && values2[index]) {
      if (!isSameObjectValues(item, values2[index], fields)) {
        indices.push(index);
      }
    }
  });

  return indices;
};
export const isSameObjectValues = (obj1, obj2, fields = []) => {
  const values1 = Object.entries(obj1);
  const values2 = Object.entries(obj2);

  let isSame = true;
  values1.forEach((item, index) => {
    const [key, value] = item;
    for (let field of fields) {
      if (field && key === field && value !== values2[index][1]) {
        isSame = false;
      }
    }
  });

  return isSame;
};
