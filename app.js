const http          = require('http');
const port          = 7000;
const express       = require('express');
require('dotenv').config();
const bodyParser    = require('body-parser');
const app           = express();  
const post          = require('./routers/post');
const gallery       = require('./routers/gallery');
const server = http.createServer(app);
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public')); 
app.use('/public/img', express.static('public/img'));


/*ROUTERS*/
app.get('/', (req, res) => {
    res.send('Welcome To NextJs Blog Api');
})
app.use('/post/', post);
app.use('/gallery', gallery);

server.listen(port)

console.log(`server running http://localhost:${port}`);






