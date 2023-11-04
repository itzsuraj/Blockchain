const {GENSIS_DATA} = require('./config');
class Block {
  constructor({timestamp,prevhash,hash,data}) {
    this.timestamp= timestamp; // current time stamp
    this.prevhash = prevhash; // previous block hash
    this.hash= hash; // generated hash from data;
    this.data = data; //transaction data;
  }
static geneics(){
    return new this(Genesis_Data)
}
}

const genesisBlock = new Block({
    hash:'0xcacb',
    timestamp:'2/09/22',
    prevhash:"0xc12",
    data:"hello"
});

console.log(block1,block2,block3);


