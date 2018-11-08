const keys = require('./keys')
const redis = require('redis')

const redisClient = redis.createClient({
	host: keys.redisHost,
	port: keys.redisPort,
	retry_strategy: () => 1000
})

const sub = redisClient.duplicate()

function fib(index) {
	if (index === 0) {
		return 0
	}
	if (index === 1) {
		return 1
	}

	let previous = 0
	let current = 1

	for (let i = 2; i <= index; i++) {
		current = previous + current
		previous = current - previous
	}

	return current
}

sub.on('message', (chanel, message) => {
	redisClient.hset('values', message, fib(parseInt(message)))
})

sub.subscribe('insert')
