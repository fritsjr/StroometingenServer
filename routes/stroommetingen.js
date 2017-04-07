var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://frits.jr:test@ds123370.mlab.com:23370/karelsswagstroom', ['Stroommetingen']);

// Get all
router.get('/stroommetingen', function (req, res, next) {
    db.Stroommetingen.find(function (err, stroommetingen) {
        if(err) res.send(err);
        res.json(stroommetingen);
    })
});

// Get single by object id
router.get('/stroommetingen/:id', function (req, res, next) {
    db.Stroommetingen.findOne({_id: mongojs.ObjectID(req.params.id)}, function (err, stroommeting) {
        if(err) res.send(err);
        res.json(stroommeting);
    })
});

// Add new
router.post('/stroommeting', function (req, res, next) {
    console.log("Received" + req.body)
    var stroommeting = req.body;
    // if(!abonnement.Person_ID ||  !abonnement.MB || !abonnement.Minutes || !abonnement.SMS ){
    //     res.status(400);
    //     res.json({
    //         "error": "Bad data"
    //     })
    // } else{
    db.Stroommetingen.save(stroommeting, function (err, stroommeting) {
        if(err) res.send(err);
        res.json(stroommeting);
    })
    // }
});

// Delete one by object id
router.delete('/stroommetingen/:id', function (req, res, next) {
    db.Stroommetingen.remove({_id: mongojs.ObjectID(req.params.id)}, function (err, stroommeting) {
        if(err) res.send(err);
        res.json(stroommeting);
    })
});

module.exports= router;