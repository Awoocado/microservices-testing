const { Client } = require("cloudstorm")
const zmq = require("zeromq")
sock = zmq.socket("push")

const bot = new Client(process.env.DISCORD_TOKEN, {
	initialPresence: { status: "online", activities: [{ name: "Wolking on Sunshine" }]},
	intents: ["GUILDS", "GUILD_MESSAGES"],
	firstShardId: 0,
	lastShardId: 0,
	shardAmount: 1
})


const startup = async () => {
	sock.bindSync("tcp://*:10200")
	await bot.connect()

	bot.on("event", (event) => {
		console.log(event)
		sock.send(JSON.stringify(event))
	})

	bot.on("ready", () => console.log("Bot is ready"))
}

startup().catch(e => console.error("Error on startup!", e))