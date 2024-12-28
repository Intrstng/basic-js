const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  result: '',

  getLength() {
    return this.result.split('~~').filter(Boolean).length;
  },

  addLink(value = '') {
    this.result += `( ${value} )~~`;
    return this;
  },

  removeLink(position) {
    const links = this.result.split('~~').filter(Boolean);
    if (position < 1 || typeof position !== 'number' || position > this.getLength()) {
      this.result = '';
      throw new Error('You can\'t remove incorrect link!');
    }
    links.splice(position - 1, 1);
    this.result = links.join('~~') + '~~';
    return this;
  },

  reverseChain() {
    const links = this.result.split('~~').filter(Boolean);
    this.result = links.reverse().join('~~') + '~~';
    return this;
  },

  finishChain() {
    const finalResult = this.result.slice(0, -2);
    this.result = '';
    return finalResult;
  }
};

module.exports = {
  chainMaker
};
