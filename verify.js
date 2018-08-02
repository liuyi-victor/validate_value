module.exports.verify = function (code, price, client, callback)
{
    //in the form of object, can also be in map form
    /*
    var dictionary = {"SBUX": [5,10,15,20,50], 
                      "FMSA": [15, 50, 100, 250, 500],
                      "AMZN": {minimum: 10, maximum: 200},
                      "AAPL": {minimum: 25, maximum: 300},
                      "EBAY": [25,50,100,200]};
    var result = dictionary[code];
    */
    
    const dbName = 'brand';
    const assert = require('assert');
    /*
    //the MongoDB client should be passed in and already connected to the database server
    
    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');
    
    const url = 'mongodb://localhost:27017';
    MongoClient.connect(url, (err, client) => {
      assert.equal(null, err);
      console.log("Connected successfully to server");

      const db = client.db(dbName);
      var collection = db.collection('values');
      //collection.find({brand: code}).limit(1)
      //find the document based on the brand code
      collection.find({brand: code}, (err1, curs) => {
          assert.equal(null, err1);
          console.log("checking the number of matches of brand");
          curs.toArray((err3, docs) => {
              console.log(docs.length);
              console.log(docs);
              console.log("checking the price for: "+code+" and price = "+price);
              console.log(check(docs[0], price));
          });
          //assert.strictEqual(curs.count(), 1);
          //curs.next((err2, doc) => {
          //  assert.equal(null, err2);
          //  console.log(doc);
          //})
          //console.log()
      });
      //assert.strictEqual(curs.count(), 1);
      //curs.next().then();
      client.close();
    });
    */
    const db = client.db(dbName);
    var collection = db.collection('values');
    //collection.find({brand: code}).limit(1)
    //find the document based on the brand code
    collection.find({brand: code}, (err1, curs) => {
        assert.equal(null, err1);
        console.log("checking the number of matches of brand");
        curs.toArray((err3, docs) => {
            assert(1, docs.length);
            console.log(docs);
            console.log("checking the price for: "+code+" and price = "+price);
            callback(check(docs[0].value, price));
        });
    });
    
   /*
    if(result)
    {
        if(result instanceof Array)
        {
            //discrete gift card values
            if(result.includes(price))
                return true;
            else
                return false;
        }
        else
        {
            //a range of gift card values
            if(price >= result.minimum && price <= result.maximum)
                return true;
            else
                return false;
        }
    }
    else
        return false;
        */
}
function check(result, price)
{
    console.log("requested price = "+price);
    console.log(result);
    if(result)
    {
        if(result instanceof Array)
        {
            //discrete gift card values
            //console.log("array of discrete values, length = "+result.length);
            if(result.includes(parseInt(price)))
                return true;
            else
                return false;
        }
        else
        {
            //a range of gift card values
            console.log("range of values. minimum = "+result.minimum+" maximum = "+result.maximum);
            if(price >= result.minimum && price <= result.maximum)
                return true;
            else
                return false;
        }
    }
    else
        return false;
}
