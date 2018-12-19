var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST gets urlencoded bodies
app.post('/formencoded', urlencodedParser, function (req, res) {
   console.log(req.body)
   res.setHeader('Content-Type', 'text/plain')
   res.send(req.body);
})

// POST gets JSON bodies
app.post('/jsonencoded', jsonParser, function (req, res) {
   var result = JSON.stringify(req.body, null, 4)
   console.log(result);
   res.setHeader('Content-Type', 'application/json')
   res.send(result);
})

app.listen(3000);


