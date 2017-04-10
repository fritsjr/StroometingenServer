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
            res.json(rows);
        }
        else
            console.log('Error while performing Query.');
    });
    connection.end();
});

router.post('/', function (req, res, next) {
    var connection = mysql.createConnection({
        host     : 'stroommeterdb.curonzpe7k1r.eu-central-1.rds.amazonaws.com',
        user     : 'newuser',
        password : 'Password?1',
        database : 'stroommeter_DB'
    });

    connection.connect();

    var value = req.query.value;

    var queryURL = "INSERT INTO `stroommeter_DB`.`meetwaarde` (`meetpunt_id`, `id`, `type`, `value`) VALUES ('1', '', 'elektriciteti', '" + value + "');";

    connection.query(queryURL, function(err, rows, fields) {
        if (!err){
            console.log('The solution is: ', rows);
            res.json(rows);
        }
        else
            console.log('Error while performing Query.');
    });
    connection.end();
});

module.exports = router;