const express = require('express')
const router = require('./task/router')
const cors = require('cors')
const { port, apiUri } = require('./config/conf')
const app = express()

app.use(cors());
app.options('*', cors());
app.use(express.json())
app.use(apiUri, require('./task/router'))

app.listen(port, () => {
	console.log(`App listening on port ${port}`)
})
