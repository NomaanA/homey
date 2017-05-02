'use strict';

var express = require('express');
var router = express.Router();
const Q = require('q');
var rpio = require('rpio');
var sleep = require('sleep');

const map = {
    2: 3,
    3: 5,
    4: 7,
    17: 11
}

const toggle = (pin) => {
    rpio.open(pin, rpio.OUTPUT)
    const status = rpio.read(pin);
    if (status === 1) {
        rpio.write(pin, rpio.LOW);
    } else {
        rpio.write(pin, rpio.HIGH);
    }
}


router.get('/dance', (req, res) => {
    let dancing = true;
    const first = req.param('first');
    const second = req.param('second');

    setTimeout(function() {
        dancing = false;
    }, 60000);

    while (dancing) {
        toggle(second);
        sleep.msleep(50);
        toggle(first);
        sleep.msleep(50);
        toggle(second);
        sleep.msleep(50);
    }

    res.send(first);
});

router.get('/1/status/', function(req, res, next) {

    res.send({ status: rpio.read(3) });
});

router.get('/2/status/', function(req, res, next) {

    res.send({ status: rpio.read(5) });
});

router.get('/3/status/', function(req, res, next) {

    res.send({ status: rpio.read(7) });
});

router.get('/4/status/', function(req, res, next) {

    res.send({ status: rpio.read(11) });
});








router.get('/1', function(req, res, next) {
    toggle(3, req);

    res.send({ status: rpio.read(3) });
});

router.get('/2', function(req, res, next) {
    toggle(5, req);

    res.send({ status: rpio.read(5) });
});

router.get('/3', function(req, res, next) {
    toggle(7, req);

    res.send({ status: rpio.read(7) });
});

router.get('/4', function(req, res, next) {
    toggle(11, req);

    res.send({ status: rpio.read(11) });
});



module.exports = router;