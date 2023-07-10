
const express=require("express");
const morgan=require('morgan'); 
const path =require('path');
const bodyparser=require('body-parser');
const route=require('./server/routes/router');
const connectDB=require('./server/database/connection');

// require("dotenv").config();

const app=express();

// log request
app.use(morgan('tiny'));


connectDB();

// parse request to body-parser
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");

// load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

// dotenv.config({path:'.env'});
// load routers
app.use(('/'),route);


const port=8000;
console.log(port);

app.listen(port,()=>{console.log("sever is running on ", port)});