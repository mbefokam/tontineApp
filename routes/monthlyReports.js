var express = require('express');
var router = express.Router();
var request = require("request");
var users = require('../controllers/users')
var monthlyReport = require('../controllers/monthlyReports')



router.get('category', function (req, res) {

     monthlyReport.readAll(req,function (report) {
         if (userAddress) {
             res.json(report);
         }
         else {
             res.send(401, "report not found in the table");
         }
     });
 });