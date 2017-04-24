var express = require('express');
var router = express.Router();
var rpio = require('rpio');

router.get('/4/on', function(req, res, next) {

    rpio.open(11, rpio.OUTPUT, rpio.HIGH);
    rpio.write(11, rpio.LOW);

    res.send('hello');
});

router.get('/4/off', function(req, res, next) {

    rpio.open(11, rpio.OUTPUT, rpio.HIGH);
    rpio.write(11, rpio.HIGH);

    res.send('Bye');
});

module.exports = router;