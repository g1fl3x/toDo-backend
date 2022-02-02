require('dotenv').config()

module.exports = {
    apiUri: '/api',
    dbType: 'postgres',
    port: process.env.PORT || 3000,
    username: process.env.USERNAME || '',
    password: process.env.PASSWORD || '',
    dbName: process.env.DBNAME || '',
    host: process.env.HOST || 'localhost'
}