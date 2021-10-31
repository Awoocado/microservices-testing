'use strict'
const BaseConnector = require("../node_modules/raincache/src/connector/BaseConnector")

/**
 * Zeromq Connector, used for sending messages
 * @extends BaseConnector
 */
class ZMQPushConnector extends BaseConnector {
    /**
     * Create a new ZeroMQ Connector
     * @param {Object} options - Options
     * @param {String} [options.zmqUrl=tcp://*:10300] - zmq port to connect to
     */
    constructor(options) {
        super()
        this.options = { zmqUrl: 'tcp://*:10300' }
        Object.assign(this.options, options)
        this.client = require('zeromq').socket("push")
        this.ready = false
    }

    /**
     * Initializes the connector
     * @returns {Promise.<void>}
     */
    async initialize() {
        await this.client.bind(this.options.zmqUrl)
        this.ready = true
    }

    /**
     * Forward an event to the outgoing amqp queue
     * @param {Object} event - event that should be forwarded, has to be JSON.stringify-able
     * @returns {Promise.<void>}
     */
    async send(event) {
        this.client.send(JSON.stringify(event))
    }
}


module.exports = ZMQPushConnector