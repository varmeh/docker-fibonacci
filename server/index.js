const keys = require('./keys')

// Express App setup
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Postgres Client Setup
const { Pool } = require('pg')
const pgClient = new Pool({
	user: keys.pgUser,
	host: keys.pgHost,
	database: keys.pgDatabase,
	password: keys.pgPassword,
	port: keys.pgPort
})

pgClient.on('error', () => console.log('Lost PG connection'))

pgClient
	.query('CREATE TABLE IF NOT EXISTS values (number INT)')
	.catch(err => console.log(err))

// Redis Client Setup
const redis = require('redis')
const redisClient = redis.createClient({
	host: keys.redisHost,
	port: keys.redisPort,
	retry_strategy: () => 1000
})
const redisPublisher = redisClient.duplicate()

// Set Route handlers
const routes = require('./routes')
routes(app, pgClient, redisClient, redisPublisher)

// Configure app
const port = 5000
app.listen(port, err => {
	console.log('====================================')
	console.log(`Server Listening on ${port}`)
	console.log('====================================')
})
