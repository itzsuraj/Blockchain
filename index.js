const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const Blockchain = require("./blockchain");
const Pubsub = require("./publishsubscribe");
const { set } = require("express/lib/application");

const app = express();
const blockchain = new Blockchain();
const pubsub = new Pubsub({blockchain});

const DEFAULTPORT = 3000;
const ROOT_NODE_ADDRESS  =`http://localhost:3000: ${DEFAULTPORT}`;

const syncChains=()=>{
  request({url:`${ROOT_NODE_ADDRESS}/api/blocks`},(error,response,body)=>{
    if(!error && response.statusCode === 200){
      const rootChain = JSON.parse(body);
      console.log("replace chain on a sync with",rootChain);
      blockchain.replaceChain(rootChain);
    }
  })
}

setTimeout(() => pubsub.broadcastChain(), 1000);

app.use(bodyParser.json());
app.get("/api/blocks", (req, res) => {
  res.json(blockchain.chain);
});

app.post("/api/mine",(req,res)=>{
    const { data} = req.body;
    blockchain.addBlock({data});
    pubsub.broadcastChain();
    res.redirect("/api/blocks");
})

let PEER_PORT;

if(process.env.GENERATED_PEER_PORT === 'true'){
    PEER_PORT = DEFAULTPORT + Math.ceil(Math.random()*1000);
}

const PORT = PEER_PORT || DEFAULTPORT;

console.log(PORT,"PORT");

app.listen(PORT, () =>{
  syncChains();
  console.log(`listening at ${PORT}`)
} );
