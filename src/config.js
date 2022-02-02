module.exports = {
    apiUri: '/api',
    port: process.env.PORT || 3000,
    username: process.env.USERNAME || '',
    password: process.env.PASSWORD || '',
    dbName: process.env.DBNAME || '',
    dbType: process.env.DBTYPE || 'postgres',
    host: process.env.HOST || 'localhost'
}