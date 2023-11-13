const MINE_RATE = 1000;
const INITIAL_DIFFICULTY = 4;

const GENSIS_DATA = {
    timestamp:Date.now(),
    prevhash:null,
    hash:'0xc123456',
    nonce: 0,
    difficulty:INITIAL_DIFFICULTY,
    data:"suraj"
}
module.exports = {GENSIS_DATA,INITIAL_DIFFICULTY,MINE_RATE};