const http          = require('http');
const port          = 7000;
const express       = require('express');
require('dotenv').config();
const bodyParser    = require('body-parser');
const app           = express();  
const login         = require('./routers/login');
const users         = require('./routers/user');
const posts          = require('./routers/post');
const gallerys       = require('./routers/gallery');
const comments      = require('./routers/comment');
const categorys     = require('./routers/category');
const postCategorys  = require('./routers/postCategory');
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
app.use('/login', login);
app.use('/users', users);
app.use('/posts', posts);
app.use('/gallerys', gallerys);
app.use('/comments', comments);
app.use('/categorys', categorys);
app.use('/post-categorys', postCategorys);

server.listen(port)

console.log(`server running http://localhost:${port}`);






