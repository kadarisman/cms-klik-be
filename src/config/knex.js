const konfig_knex = {
    client : "mysql2",
    connection : {
        host : process.env.DB_HOST,
        port : process.env.DB_PORT,
        user : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE,
        ssl:{
            "rejectUnauthorized":true
        }
    },
    debug : true
}
module.exports = require("knex")(konfig_knex);