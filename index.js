const bodyParser = require("body-parser");
const express = require("express");
const Blockchain = require("./blockchain");
const Pubsub = require("./publishsubscribe");
const { set } = require("express/lib/application");

const app = express();
const blockchain = new Blockchain();
const pubsub = new Pubsub({blockchain});
setTimeout(() => pubsub.broadcastChain(), 1000);

app.use(bodyParser.json());
app.get("/api/blocks", (req, res) => {
  res.json(blockchain.chain);
});

app.post("/api/mine",(req,res)=>{
    const { data} = req.body;
    blockchain.addBlock({data});
    res.redirect("/api/blocks");
})

const PORT = 3000;
app.listen(PORT, () => console.log(`listening at ${PORT}`));
