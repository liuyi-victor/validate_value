module.exports.verify = function (code, price, client, callback)
{
    const assert = require('assert');
    const dbName = 'brand';
    const db = client.db(dbName);
    var collection = db.collection('values');

    //find the document based on the brand code
    collection.find({brand: code}, (err1, curs) => {
        assert.equal(null, err1);
        console.log("checking the number of matches of brand");
        curs.toArray((err3, docs) => {
            if(docs.length == 0)
            {
                callback(false);
            }
            else
            {
                console.log(docs);
                console.log("checking the price for: "+code+" and price = "+price);
                callback(check(docs[0].value, price));
            }
        });
    });
}
function check(result, price)
{
    if(result)
    {
        if(result instanceof Array)
        {
            //discrete gift card values
            if(result.includes(parseInt(price)))
                return true;
            else
                return false;
        }
        else
        {
            //a range of gift card values
            //console.log("range of values. minimum = "+result.minimum+" maximum = "+result.maximum);
            if(price >= result.minimum && price <= result.maximum)
                return true;
            else
                return false;
        }
    }
    else
        return false;
}
