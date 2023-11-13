const Block = require("./block");
const cryptoHash = require("./crypto-hash");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
    // console.log(this.chain,"this.chain");
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      prevBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(newBlock);
  }

  replaceChain(incomingChain) {
    if (incomingChain.length <= this.chain.length) {
      // console.log("incomingChain.length",incomingChain.length);
      // console.log("this.chain.length",this.chain.length);
      console.log("this incoming chain is not longer then current chain");
      return;
      
    }
    if (!Blockchain.isValidChain(incomingChain)) {
      console.log("this incoming chain is not valid");
      return;
    }
    this.chain = incomingChain;
  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }
    for (let i = 1; i < chain.length; i++) {
      const { timestamp, prevhash, hash, nonce, difficulty, data } = chain[i];
      const lastDifficulty = chain[i - 1].difficulty;
      const realLastHash = chain[i - 1].hash;

      if (prevhash !== realLastHash) return false;
      const validateHash = cryptoHash(
        timestamp,
        prevhash,
        nonce,
        difficulty,
        data
      );
      if (hash !== validateHash) return false;
      if (Math.abs(lastDifficulty - difficulty) > 1) return false;
    }
    return true;
  }
}

const blockchain = new Blockchain();
blockchain.addBlock({ data: "data1" });
blockchain.addBlock({ data: "suraj" });
blockchain.addBlock({ data: "vishal" });

console.log("blockchain", blockchain);

module.exports = Blockchain;
