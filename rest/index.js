const StarGear = require('stargear')
const RainCache = require('raincache')
const { ZMQPullConnector } = require("./handmade")
let RedisEngine = RainCache.Engines.RedisStorageEngine

let bot = new StarGear({
    cache: new RainCache({
      storage: {
        default: new RedisEngine({ host: process.env.REDIS_HOST })
      },
      debug: false}),
    token: process.env.DISCORD_TOKEN
  },
  new ZMQPullConnector({ zmqUrl: 'tcp://cache:10300' })
)

bot.on('messageCreate', async (msg) => {
  let channel = await bot.cache.channel.get(msg.channel_id)
  console.log(`#${channel.name}: ${msg.author.username}#${msg.author.discriminator}: ${msg.content}`)
  if (msg.content === '!ping') {
    let time = Date.now()
    let pingMsg = await bot.rest.channel.createMessage(msg.channel_id, 'Pong?');
    return bot.rest.channel.editMessage(msg.channel_id, pingMsg.id, `Pong \`${Date.now() - time}ms\`!`)
  }
})

bot.initialize()
  .then(() => console.log('initialized successfully'))
  .catch(e => console.error(e))