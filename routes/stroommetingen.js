var express = require('express');
var router = express.Router();
var mysql      = require('mysql');

router.get('/', function(req, res, next) {
    var connection = mysql.createConnection({
        host     : 'stroommeterdb.curonzpe7k1r.eu-central-1.rds.amazonaws.com',
        user     : 'newuser',
        password : 'Password?1',
        database : 'stroommeter_DB'
    });

    connection.connect();

    var queryURL = "SELECT * FROM meetwaarde;";


    connection.query(queryURL, function(err, rows, fields) {
        if (!err){
            console.log('The solution is: ', rows);

            // var jsonRes = res.json(rows);

            var date = rows[0].datum;
            var hours = date.getHours();

            var myCounter = new Map();

            for(var i = 0; i <24; i++){
                myCounter.set(i, 0);
            }

            //loop over the rows
            for(var i = 0; i < rows.length; i++){
                var log = rows[i].datum;
                var val = rows[i].datum.getHours();
                console.log("val: " + val);
                myCounter.set(val, (myCounter.get(val) + 1));
            }

            var arr = [];

            for(var i = 0; i < 24; i++){
                arr[i] = myCounter.get(i);
            }

            res.json(arr);
            console.log("breakpoint");
            // res.json("test");
        }
        else
            console.log('Error while performing Query.');
    });
    connection.end();
});

function mapToJson(map) {

    return oo.serialize(map);
}

module.exports = router;