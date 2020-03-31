const { StringDecoder } = require('string_decoder');
const { Transform } = require('stream');

const A = 'A'.charCodeAt(0);
const a = 'a'.charCodeAt(0);
const Z = 'Z'.charCodeAt(0);
const z = 'z'.charCodeAt(0);

class Transformer extends Transform {
  constructor(options) {
    super(options);
    this.shift = options.action === 'encode' ? options.shift : -options.shift;
    this.decoder = new StringDecoder('utf-8');
  }

  converter(letter, minCode, maxCode) {
    const shifted = letter + this.shift;
    if (shifted < minCode) {
      return shifted + maxCode - minCode + 1;
    }
    if (shifted > maxCode) {
      return shifted - maxCode + minCode - 1;
    }
    return shifted;
  }

  code(letter) {
    if (letter.charCodeAt(0) >= A && letter.charCodeAt(0) <= Z) {
      return String.fromCharCode(this.converter(letter.charCodeAt(0), A, Z));
    } else if (letter.charCodeAt(0) >= a && letter.charCodeAt(0) <= z) {
      return String.fromCharCode(this.converter(letter.charCodeAt(0), a, z));
    }
    return String.fromCharCode(letter.charCodeAt(0));
  }

  _transform(obj, encode, callback) {
    if (encode === 'buffer') {
      obj = this.decoder.write(obj);
      let res = '';
      if (obj.length > 1) {
        for (let i = 0; i < obj.length; i += 1) {
          res += this.code(obj[i]);
        }
      } else {
        res = this.code(obj);
      }
      obj = res;
    }

    callback(null, obj);
  }
}

module.exports = Transformer;
