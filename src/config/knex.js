const konfig_knex = {
    client : "mysql2",
    connection : {
        host : "nmuoym4nrnxt.us-east-1.psdb.cloud",
        port : "3306",
        user : "e187r01164a7",
        password : "pscale_pw_9hnFXw5PdScNKDFq2vi7FDMotE-VRP_oSYUT3P6vRGk",
        database : "cms-klik",
        ssl:{
            "rejectUnauthorized":true
        }
    },
    debug : true
}
module.exports = require("knex")(konfig_knex);