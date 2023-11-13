const crypto = require("crypto");

const cryptoHash = (...inputs) => {
  const hash = crypto.createHash("sha256");
  const clearity = inputs.sort().join("");
  hash.update(clearity);
  return hash.digest("hex");
};

const result = cryptoHash("world", "hello");

module.exports = cryptoHash;
