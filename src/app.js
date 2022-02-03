const express = require('express')
const cors = require('cors')
const { appPort, apiUri } = require('./config/config')
const recursive = require('recursive-readdir-sync');
const app = express()

app.use(cors());
app.options('*', cors());
app.use(express.json())

recursive(`${__dirname}/task`).forEach((file) => {
    app.use(apiUri, require(file))
});

app.listen(appPort, () => {
	console.log(`App listening on port ${appPort}`)
})
