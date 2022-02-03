const express = require('express')
const router = require('./task/router')
const cors = require('cors')
const { port, apiUri } = require('./config/conf')
const app = express()
const recursive = require('recursive-readdir-sync');

app.use(cors());
app.options('*', cors());
app.use(express.json())

recursive(`${__dirname}/task`).forEach((file) =>
	app.use(apiUri, require(file))
);

app.listen(port, () => {
	console.log(`App listening on port ${port}`)
})
