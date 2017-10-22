var express = require('express');
var router = express.Router();
var viewsToday = 0;

setTimeout(() => {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  if(hours === 23 && minutes >= 59)
    viewsToday = 0;
}, 59000)


router.get('/', function(req, res, next) {
  viewsToday += 1;
  res.json({viewsOfPage: viewsToday});
});

module.exports = router;
