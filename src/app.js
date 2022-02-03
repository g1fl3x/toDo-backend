const express = require('express')
const cors = require('cors')
const { appPort, apiUri } = require('./config/config')
const app = express()

app.use(cors());
app.options('*', cors());
app.use(express.json())
app.use(apiUri, require('./task/router'))

app.listen(appPort, () => {
	console.log(`App listening on port ${appPort}`)
})
