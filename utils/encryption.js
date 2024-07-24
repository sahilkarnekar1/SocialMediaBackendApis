// utils/encryption.js
const CryptoJS = require('crypto-js');

const encrypt = (text) => {
  const ciphertext = CryptoJS.AES.encrypt(text, process.env.ENCRYPTION_SECRET).toString();
  return ciphertext;
};

const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.ENCRYPTION_SECRET);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

module.exports = { encrypt, decrypt };
