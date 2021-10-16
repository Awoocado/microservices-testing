const { Client } = require("cloudstorm")
const amqp = require("amqp")

const bot = new Client(process.env.DISCORD_TOKEN, {
	initialPresence: { status: "online", activities: [{ name: "Wolking on Sunshine" }]},
	intents: ["GUILDS", "GUILD_MESSAGES"],
	firstShardId: 0,
	lastShardId: 0,
	shardAmount: 1
})


const startup = async () => {
	const connection = amqp.createConnection({ host: process.env.RABBITMQ_HOST })
	connection.on("ready", async () => {
		await bot.connect()
		bot.on("event", (event) => {
			connection.publish("test-pre-cache", event)
		})
	})

	connection.on("error", e => console.error(e))
	bot.on("ready", () => console.log("Bot is ready"))
}

startup().catch(e => console.error("Error on startup!", e))