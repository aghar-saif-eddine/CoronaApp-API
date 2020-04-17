const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// create express app
const app = express();
const userRouter = require('./routes/user');
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// connection to db Mongo
dotenv.config();
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true , useUnifiedTopology: true}).then (() => {
    console.log("Successfully connected to the db");    
     }).catch(err => {
    console.log('Could not connect to the db. ', err);
    process.exit();
});
// define a simple route


app.get('/', (req, res) => {
    res.send({"message": "API WORKED."});
});
app.use(userRouter);
// listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is listening on port" ,{PORT});
});