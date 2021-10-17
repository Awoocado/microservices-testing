let RainCache = require('raincache')
let Redis = RainCache.Engines.RedisStorageEngine
let { ZMQPullConnector, ZMQPushConnector } = require("./handmade")

let cache = new RainCache({
  storage: { default: new Redis({ host: process.env.REDIS_HOST }) },
  debug: false
}, 
new ZMQPullConnector({ zmqUrl: 'tcp://gateway:10200' }),
new ZMQPushConnector({ zmqUrl: 'tcp://*:10300' }))

let init = async () => {
  await cache.initialize()
}

init().then(async () => {
  console.log('Cache iniciado')
}).catch(e => console.error(e))