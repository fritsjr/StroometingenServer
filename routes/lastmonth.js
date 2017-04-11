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

    var queryURL = "SELECT DATE_FORMAT(datum, '%Y-%m-%d') AS the_date, COUNT(*) AS count FROM meetwaarde where datum between date_sub(now(),INTERVAL 31 DAY) and now() GROUP  BY the_date;";

    connection.query(queryURL, function(err, rows, fields) {
        if (!err){
            console.log('The solution is: ', rows);

            // var jsonRes = res.json(rows);

            // var date = rows[0].datum;
            // var day = date.getDay();
            //
            // var myCounter = new Map();
            //
            // for(var i = 0; i <31; i++){
            //     myCounter.set(i, 0);
            // }
            //
            // //loop over the rows
            // for(var i = 0; i < rows.length; i++){
            //     var val = rows[i].datum.getDate();
            //     console.log("day: " + val);
            //     myCounter.set(val, (myCounter.get(val) + 1));
            // }

            var arr = [];

            for(var i = 0; i < 31; i++){
                arr[i] = rows[i].count;
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