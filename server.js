var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}
function sleep(n) {
    msleep(n * 1000);
}


// POST with urlencoded bodies
app.post('/formencoded', urlencodedParser, function (req, res) {
    console.log(req.body)
    res.setHeader('Content-Type', 'text/plain')
    res.send(req.body);
})

// PUT with urlencoded bodies
app.put('/formencoded', urlencodedParser, function (req, res) {
    console.log(req.body)
    res.setHeader('Content-Type', 'text/plain')
    res.send(req.body);
})

// POST with JSON bodies
app.post('/jsonencoded', jsonParser, function (req, res) {
    var result = JSON.stringify(req.body, null, 4)
    console.log('received POST request, artificially waiting 2 secs with reply')
    let fn= () => {
        console.log('timeout completed')
        res.setHeader('Content-Type', 'application/json')
        res.send(result);
    };
    setTimeout(fn, 2000);
})

// PUT with JSON bodies
app.put('/jsonencoded', jsonParser, function (req, res) {
    var result = JSON.stringify(req.body, null, 4)
    res.setHeader('Content-Type', 'application/json')
    res.send(result);
})

app.listen(3000);


