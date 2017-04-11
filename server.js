// Includes
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// Routes
var index = require('./routes/index');
var stroommetingen = require('./routes/stroommetingen');
var upload = require('./routes/uploadPulse');
var lastmonth = require('./routes/lastmonth');
var lastweek = require('./routes/lastweek');

var port = 3030;

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/last24hour', stroommetingen);
app.use('/upload', upload);
app.use('/lastmonth', lastmonth);
app.use('/lastweek', lastweek);

app.listen(port, function () {
    console.log("Server started on port " + port);
});