const http          = require('http');
const port          = 7000;
const express       = require('express');
require('dotenv').config();
const bodyParser    = require('body-parser');
const app           = express();  
const server = http.createServer(app);
const path = require('path');
const Routers = require('./routers/index');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public')); 
app.use('/public/img', express.static('public/img'));

app.get('/', (req, res) => {
    res.send('Welcome To Express Blog Api');
})
app.use(Routers);
server.listen(port);
console.log(`server running http://localhost:${port}`);






