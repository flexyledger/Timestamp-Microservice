// Basic required imports for NodeJS
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var css = require('css');
//var router = express.Router();

// Create an instance of express for our app and insatantiate bodyParser and cors
var app = module.exports = express();
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(cors());

// GET call to return JSON that formats natural and unix date
app.get('/dateValues/:dateVal', function(req, res, next){
  // Gets the request data for date
  var dateVal = req.params.dateVal;
  // Options for formatting date in natural date view
  var dateFormattingOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  if(isNaN(dateVal)){  // Not a Number (숫자가 아니라면 true, 숫자라면 false)
    var unixDate = new Date(dateVal).getTime()/1000;
    var naturalDate = new Date(dateVal);
    naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
  }
  else {
    var unixDate = dateVal;
    var naturalDate = new Date(dateVal * 1000);
    naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
  }

  res.json({unix: unixDate, natural: naturalDate});
})

app.get('/', function(req, res) {
  res.render('index');
})


app.listen(3000, function(){
  console.log('Working');
});
