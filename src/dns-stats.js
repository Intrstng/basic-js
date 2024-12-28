const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const record = {};
  for (let i = 0; i < domains.length; i += 1) {
    let current = '';
    const parts = domains[i].split('.').reverse();

    for (let j = 0; j < parts.length; j += 1) {
      current += `.${parts[j]}`;
      record[current] = (record[current] || 0) + 1;
    }
  }
  return record;
}

module.exports = {
  getDNSStats
};
