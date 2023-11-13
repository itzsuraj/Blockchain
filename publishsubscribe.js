const redis = require("redis");


const CHANNELS = {
  TEST: "TEST",
  BLOCKCHAIN:"BLOCKCHAIN"
};

class Pubsub {
  constructor({blockchain}) {
    this.blockchain = blockchain;
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.subscriber.subscribe(CHANNELS.TEST);
    this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);


    this.subscriber.on("message", (channel, message) => {
      this.handelMessage(channel, message);
    });
  }
  handelMessage(channel, message) {
    console.log(`Message received. Channel: ${channel}. Message: ${message}.`);
    const parsedMessage = JSON.parse(message);
    if(channel === CHANNELS.BLOCKCHAIN){
      this.blockchain.replaceChain(parsedMessage);
    }
  }
  publish({channel ,message}){
    this.publisher.publish(channel,message);
  }
  broadcastChain(){
    this.publish({
        channel:CHANNELS.BLOCKCHAIN,
        message:JSON.stringify(this.blockchain.chain),
    })
  }

  
}
module.exports = Pubsub;

// const checkPubsub =  new Pubsub();
// setTimeout(() => checkPubsub.publisher.publish(CHANNELS.TEST, "hello"), 1000);
