const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./router/loanRouter");
const mongoose = require("mongoose");
const app = express();

require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
app.use(router);

app.get('/',(req,res) => {
    res.status(203).sendFile('index');
});

app.get('/dashboard',(req,res)=> {
    res.status(303).sendFile(__dirname+'/public/dashboardloan.html');
});
app.get('/view',(req,res)=> {
    res.status(303).sendFile(__dirname+'/public/viewloans.html');
});

const start = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(()=> {
        app.listen(process.env.PORT,()=> {
            console.log("app running on port: "+`http://localhost:${process.env.PORT}/`);
        });
    }).catch(e=>new Error(e));
}

start();