/*
 * sample server for verify of values
 */
const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const verification = require('./verify')

var app = express();

const url = 'mongodb://localhost:27017';
const dbName = 'brand'; 

var client;
MongoClient.connect(url, (err, conn) => {
    assert.equal(null, err);
    console.log("Connected successfully to database server");
    throw err;
    client = conn;

    app.listen(3000, () => {
        console.log('started server listening on port 3000');
    });
});

app.use(express.urlencoded());
app.get('/brand/:_code', (req, res) => {
    let code = req.param._code;
    let value = req.body.value;
    verification.verify(code, value, client, function(result) {
        res.status(200).json({result: true});
    });
});

