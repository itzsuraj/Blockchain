const { GENSIS_DATA, INITIAL_DIFFICULTY,MINE_RATE } = require("./config");
const cryptoHash = require("./crypto-hash");
const hextoBinary = require("hex-to-binary");


class Block {
  constructor({ timestamp, prevhash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp; // current time stamp
    this.prevhash = prevhash; // previous block hash
    this.hash = hash; // generated hash from data;
    this.data = data; //transaction data;
    this.nonce = nonce; // nonce value
    this.difficulty = difficulty; // difficulty value is a target value for the hash;
  }
  static genesis() {
    return new this({ ...GENSIS_DATA });
  }
  static mineBlock({ prevBlock, data }) {
    let hash, timestamp;

    // console.log("prevBlock", prevBlock);

    const prevhash = prevBlock && prevBlock.hash ? prevBlock.hash : null;
    // const {difficulty} = prevBlock;
    let difficulty;
    if (prevBlock) {
      difficulty = prevBlock.difficulty;
    } else {
      difficulty = INITIAL_DIFFICULTY;
    }
    // console.log("prevBlock", prevBlock);
    // console.log("difficulty", difficulty);
    let nonce = 0;
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({
        originalBlock: prevBlock,
        timestamp,
      });
      hash = cryptoHash(timestamp, prevhash, data, nonce, difficulty);
      // console.log("hash",hash);
    } while (hextoBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty));
    return new this({
      timestamp,
      prevhash,
      data,
      nonce,
      difficulty,
      hash,
    });
  }
  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;
    if (difficulty < 1) return 1;
    const difference = timestamp - originalBlock.timestamp;
    if (difference > MINE_RATE) return difficulty - 1;
    return difficulty + 1;
  }
}


module.exports = Block;

