/*
 * sample server for verify of values
 */
const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const verification = require('./verify')
const bodyParser = require('body-parser');
var app = express();

const url = 'mongodb://localhost:27017';
const dbName = 'brand'; 

var client;
MongoClient.connect(url, (err, conn) => {
    assert.equal(null, err);
    console.log("Connected successfully to database server");
    client = conn;

    app.listen(3000, () => {
        console.log('started server listening on port 3000');
    });
});

app.use(express.urlencoded());
app.get('/brand/:_code/:_value', (req, res) => {
    console.log("brand code: "+req.params._code);
    let code = req.params._code;
    console.log("checking for value = "+req.params._value);
    let value = req.params._value;
    verification.verify(code, value, client, function(ans) {
        res.status(200).json({result: ans});
    });
});

