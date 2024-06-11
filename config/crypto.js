const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(
    process.env.CRYPTO_ALGO,
    process.env.CRYPTO_KEY,
    process.env.CRYPTO_IV
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
};

const decrypt = (text) => {
  const encryptedText = Buffer.from(text, "hex");
  const decipher = crypto.createDecipheriv(
    process.env.CRYPTO_ALGO,
    process.env.CRYPTO_KEY,
    process.env.CRYPTO_IV
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

module.exports = { encrypt, decrypt };
