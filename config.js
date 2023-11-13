const MINE_RATE = 1000;
const INITIAL_DIFFICULTY = 1;

const GENSIS_DATA = {
    timestamp:1,
    prevhash:null,
    hash:'0xc123456',
    nonce: 0,
    difficulty:INITIAL_DIFFICULTY,
    data:"suraj"
}
module.exports = {GENSIS_DATA,INITIAL_DIFFICULTY,MINE_RATE};