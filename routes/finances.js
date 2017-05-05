var express = require('express');
var router = express.Router();
var request = require("request");
var users = require('../controllers/users')
var finances = require('../controllers/finances')

// create un nouveau recouvrement
router.post('/recouvrements', function (req, res) {
     finances.recouvrement(req, function (recouvrement) {
         if (recouvrement) {
             res.json(recouvrement);
         }
         else {
             res.send(401, "data not found in the table");
         }
     });
 });


router.get('/user/retrieve', function (req, res) {
    
     finances.read(function (finances) {
         if (finances) {
             res.json(finances);
         }
         else {
             res.send(401, "data not found in the table");
         }
     });
 });


module.exports = router;