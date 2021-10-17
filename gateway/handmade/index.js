class ZMQConnector {
    constructor(ops= {}){
        this.options = { zmqUrl: 'tcp://*:10200' }
        Object.assign(this.options, options)
        this.client = require("zeromq").socket("push")
    }

    async initialize(){
        await this.client.connect(this.options.zmqUrl)
    }

    async send(msg){
        this.client.send(msg)
    }
}

module.exports = { ZMQConnector }