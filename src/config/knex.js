const konfig_knex = {
    client : "mysql2",
    connection : {
        host : "103.144.79.194",
        port : "3306",
        user : "support",
        password : "Supp0rt",
        database : "test"
    },
    debug : true
}
module.exports = require("knex")(konfig_knex);