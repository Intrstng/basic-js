const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
    this.uppercaseAlphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  }
  encrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');
    let result = '';
    let keyIndex = 0;
    let messageCapitalized = message.toUpperCase();
    let keyCapitalized = key.toUpperCase();
    const keyLength = keyCapitalized.length;

    for (let i = 0; i < messageCapitalized.length; i += 1) {
      const letter = messageCapitalized[i];
      if (this.uppercaseAlphabet.includes(letter)) {
        const messageCode = letter.charCodeAt(0) - 'A'.charCodeAt(0);
        const keyCode = keyCapitalized[keyIndex % keyLength].charCodeAt(0) - 'A'.charCodeAt(0);
        const encryptedChar = String.fromCharCode((messageCode + keyCode) % 26 + 'A'.charCodeAt(0));
        result += encryptedChar;
        keyIndex += 1;
      } else {
        result += letter;
      }
    }
    if (this.direct) {
      return result;
    } else {
      return result.split('').reverse().join('');
    }
  }
  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) throw new Error('Incorrect arguments!');
    let result = '';
    let keyIndex = 0;
    let encryptedMessageCapitalized = encryptedMessage.toUpperCase();
    let keyCapitalized = key.toUpperCase();
    const keyLength = keyCapitalized.length;

    for (let i = 0; i < encryptedMessageCapitalized.length; i += 1) {
      const letter = encryptedMessageCapitalized[i];
      if (this.uppercaseAlphabet.includes(letter)) {
        const encryptedCode = letter.charCodeAt(0) - 'A'.charCodeAt(0);
        const keyCode = keyCapitalized[keyIndex % keyLength].charCodeAt(0) - 'A'.charCodeAt(0);
        const decryptedChar = String.fromCharCode((encryptedCode - keyCode + 26) % 26 + 'A'.charCodeAt(0));
        result += decryptedChar;
        keyIndex += 1;
      } else {
        result += letter;
      }
    }
    if (this.direct) {
      return result;
    } else {
      return result.split('').reverse().join('');
    }
  }
}

module.exports = {
  VigenereCipheringMachine
};
