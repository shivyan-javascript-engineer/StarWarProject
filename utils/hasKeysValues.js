// Returns true if target keys with specific values exists in a array of objects, false otherwise.
const hasKeysValues = (arr, keys, values) => {
  if (arr.length < 1 || keys.length < 1) return false;
  if (keys.length !== values.length) return false;
  return arr.some(obj => keys.every((key, index) => obj[key] === values[index]));
};

module.exports = hasKeysValues;
