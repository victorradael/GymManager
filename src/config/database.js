const {Pool} = require('pg')

module.exports = new Pool({
    user: 'postgres',
    password: "171827",
    host:"localhost",
    port: 5432,
    database:"gymmanager",
})