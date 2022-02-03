require('dotenv').config({ path: `${__dirname}/.env` })

module.exports = {
    apiUri: '/api',
    dialect: 'postgres',
    appPort: process.env.PORT || 3000,
    username: process.env.USERNAME || '',
    password: process.env.PASSWORD || '',
    database: process.env.DBNAME || 'postgres',
    host: process.env.HOST || 'localhost'
}