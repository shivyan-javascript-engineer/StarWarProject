// Search value in the array of objects and return matched objects
const searchValue = (arr, val, resultBy) =>
  arr.length < 1
    ? []
    : arr
        .filter(obj => obj.name.toLowerCase().search(val.toLowerCase()) !== -1)
        .map(obj => obj[resultBy]);

module.exports = searchValue;
