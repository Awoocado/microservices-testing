let RainCache = require('raincache')
let AmqpConnector = RainCache.Connectors.AmqpConnector
let Redis = RainCache.Engines.RedisStorageEngine
let con = new AmqpConnector({ amqpUrl: `amqp://${process.env.RABBITMQ_HOST}` })

let cache = new RainCache({
  storage: { default: new Redis({ host: process.env.REDIS_HOST }) },
  debug: false
}, con, con)

let init = async () => {
  await cache.initialize()
}

cache.on('debug', (data) => {
  console.log(data)
})
init().then(async () => {
  console.log('Cache iniciado')
}).catch(e => console.error(e))