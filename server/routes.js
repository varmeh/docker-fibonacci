module.exports = (app, pgClient, redisClient, redisPublisher) => {
	app.get('/', (_, res) => {
		res.send({
			hi: 'there',
			welcome: 'to fibonacci app backend server'
		})
	})

	app.get('/values/all', async (_, res) => {
		const values = await pgClient.query('SELECT * FROM values')
		res.send(values.rows)
	})

	app.get('values/current', async (_, res) => {
		redisClient.hgetall('values', (err, values) => {
			res.send(values)
		})
	})

	app.post('/values', async (req, res) => {
		const { index } = req.body

		if (parseInt(index) > 40) {
			return res.status(422).send('Index too high')
		}

		redisClient.hset('values', index, 'evalPending')
		redisPublisher.publish('insert', index)
		pgClient.query('INSERT INTO values(number) VALUES($1)', [index])

		res.send({ working: true })
	})
}
