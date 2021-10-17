'use strict';
const RainCache = require('raincache')
const BaseConnector = require("../node_modules/raincache/src/connector/BaseConnector")

/**
 * Zeromq Connector, used for receiving and sending messages to an amqp based message queue
 * @extends BaseConnector
 */
class ZMQPushConnector extends BaseConnector {
    /**
     * Create a new ZeroMQ Connector
     * @param {Object} options - Options
     * @param {String} [options.zmqUrl=tcp://*:10300] - zmq host to connect to
     */
    constructor(options) {
        super()
        this.options = { zmqUrl: 'tcp://*:10300' }
        Object.assign(this.options, options)
        this.client = require('zeromq').socket("push")
        this.ready = false
    }

    /**
     * Initializes the connector by creating a new connection to the amqp host set via config and creating a new queue to receive messages from
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