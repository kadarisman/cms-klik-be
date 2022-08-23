const konfig_knex = {
    client : "mysql2",
    connection : {
        host : "localhost",
        port : "3306",
        user : "root",
        password : "",
        database : "blog",
    },
    debug : true
}
module.exports = require("knex")(konfig_knex);