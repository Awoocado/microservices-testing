'use strict'
const BaseConnector = require("../node_modules/raincache/src/connector/BaseConnector")

/**
 * Zeromq Connector, used for receiving messages
 * @extends BaseConnector
 */
class ZMQPullConnector extends BaseConnector {
    /**
     * Create a new ZeroMQ Connector
     * @param {Object} options - Options
     * @param {String} [options.zmqUrl=tcp://*:10200] - zmq port to listen to
     */
    constructor(options) {
        super()
        this.options = { zmqUrl: 'tcp://*:10200' }
        Object.assign(this.options, options)
        this.client = require('zeromq').socket("pull")
        this.ready = false
    }

    /**
     * Initializes the connector
     * @returns {Promise.<void>}
     */
    async initialize() {
        this.client.connect(this.options.zmqUrl)
        this.ready = true
        this.client.on("message", (msg) => this.send(msg))
    }

    send(msg){
        this.emit('event', JSON.parse(msg.toString()))
    }
}

module.exports = ZMQPullConnector