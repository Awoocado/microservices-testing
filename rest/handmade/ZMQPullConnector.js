let RainCache = require('raincache')
let BaseConnector = require("../node_modules/raincache/src/connector/BaseConnector")
const zmq = require('zeromq')

/**
 * Zeromq Connector, used for receiving and sending messages to an amqp based message queue
 * @extends BaseConnector
 */
class ZMQPullConnector extends BaseConnector {
    /**
     * Create a new ZeroMQ Connector
     * @param {Object} options - Options
     * @param {String} [options.zmqUrl=tcp://*:10200] - zmq host to connect to
     */
    constructor(options) {
        super()
        this.options = { zmqUrl: 'tcp://*:10200' }
        Object.assign(this.options, options)
        this.client = zmq.socket("pull")
        this.ready = false;
    }

    /**
     * Initializes the connector by creating a new connection to the amqp host set via config and creating a new queue to receive messages from
     * @returns {Promise.<void>}
     */
    async initialize() {
        await this.client.connect(this.options.zmqUrl)
        this.ready = true
        this.client.on("message", (msg) => {
            console.log(JSON.parse(msg.toString()))
            this.emit('event', JSON.parse(msg.toString()))
        })
    }
}

module.exports = ZMQPullConnector