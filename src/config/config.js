require('dotenv').config({ path: `${__dirname}/.env` })

module.exports = {
    apiUri: '/api',
    dialect: 'postgres',
    appPort: process.env.APP_PORT || 3000,
    username: process.env.USERNAME || '',
    password: process.env.PASSWORD || '',
    database: process.env.DB_NAME || 'postgres',
    host: process.env.HOST || 'localhost'
}