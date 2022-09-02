const konfig_knex = {
    client : "mysql2",
    connection : {
        // host : process.env.DB_HOST,
        // port : process.env.DB_PORT,
        // user : process.env.DB_USERNAME,
        // password : process.env.DB_PASSWORD,
        // database : process.env.DB_DATABASE,
        host : "us-east.connect.psdb.cloud",
        port : "3306",
        user : "fau898shktpzzw5szm87",
        password : "pscale_pw_wb19vhQDHkpfeN4EVAyPIaTdcjvajJVMU1M8T1e7nrA",
        database : "ecom_1",
        ssl:{
            "rejectUnauthorized":true
        }
    },
    debug : true
}
module.exports = require("knex")(konfig_knex);