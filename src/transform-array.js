const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!Array.isArray(arr)) throw new Error("'arr' parameter must be an instance of the Array!");
  if (arr.length === 0) return [];

  const DISCARD_NEXT = '--discard-next';
  const EXCLUDE_PREV = '--discard-prev';
  const DUPLICATE_NEXT = '--double-next';
  const DUPLICATE_PREV = '--double-prev';
  let newArr = [];

  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === DISCARD_NEXT && i !== arr.length - 1) {
      i += 1;
    } else if (arr[i] === EXCLUDE_PREV && arr[i - 2] !== DISCARD_NEXT && i > 0) {
      newArr.pop();
    } else if (arr[i] === DUPLICATE_NEXT && i !== arr.length - 1) {
      newArr.push(arr[i + 1]);
    } else if (arr[i] === DUPLICATE_PREV && arr[i - 2] !== DISCARD_NEXT && i > 0) {
      newArr.push(arr[i - 1]);
    } else if (arr[i] !== DISCARD_NEXT && arr[i] !== EXCLUDE_PREV && arr[i] !== DUPLICATE_NEXT && arr[i] !== DUPLICATE_PREV) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

module.exports = {
  transform
};
