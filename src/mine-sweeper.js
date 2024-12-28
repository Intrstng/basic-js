const { NotImplementedError } = require('../extensions/index.js');

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
const minesweeper = (matrix) => {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const result = Array.from({ length: rows }, () => Array(columns).fill(0));

  const directions = [
    [-1, -1], [-1, 0],
    [-1, 1], [0, -1],
    [0, 1], [1, -1],
    [1, 0], [1, 1]
  ];

  matrix.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell) {
        directions.forEach(([dx, dy]) => {
          const newRow = i + dx;
          const newColumn = j + dy;
          if (newRow >= 0 && newRow < rows && newColumn >= 0 && newColumn < columns) {
            result[newRow][newColumn]++;
          }
        });
      }
    });
  });
  return result;
};

module.exports = {
  minesweeper
};
