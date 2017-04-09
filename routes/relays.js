var express = require('express');
var router = express.Router();

function run_cmd (cmd, args, callBack) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = '';

  child.stdout.on('data', function (buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function () { callBack(resp); });
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  run_cmd('python', ['script2.py'], function (text) { console.log(text); });
  res.send('hello');
});

module.exports = router;
