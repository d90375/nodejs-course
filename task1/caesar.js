const caesarEncode = (str, shift) => {
  let newStr = '';
  for (const i of str) {
    const re = /[a-zA-Z]/;

    if (re.test(i)) {
      let En = i.codePointAt(0) + shift;
      if (i.codePointAt(0) <= 90 && En > 90) {
        En = (En % 90) + 64;
      } else if (i.codePointAt(0) <= 122 && En > 122) {
        En = (En % 122) + 96;
      }
      newStr += String.fromCharCode(En);
    } else {
      newStr += i;
    }
  }
  return newStr;
};

const caesarDecode = (str, shift) => {
  let newStr = '';
  for (const i of str) {
    const re = /[a-zA-Z]/;
    if (re.test(i)) {
      let En = i.codePointAt(0) - shift;
      if (i.codePointAt(0) <= 65 && En < 65) {
        En = 26 + En;
      } else if (i.codePointAt(0) >= 97 && En < 97) {
        En = 26 + En;
      }
      newStr += String.fromCharCode(En);
    } else {
      newStr += i;
    }
  }
  return newStr;
};

module.exports = {
  encode: caesarEncode,
  decode: caesarDecode
};
