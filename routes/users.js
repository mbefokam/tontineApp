var express = require('express');
var router = express.Router();
var request = require("request");
var users = require('../controllers/users')
var address = require('../controllers/addresses')
var finances = require('../controllers/finances')
var monthlyFees = require('../controllers/monthlypayments')
var monthlyReport = require('../controllers/monthlyReports')
var userFinance = require('../controllers/userFinances')

router.post('/user', function (req, res) {
     users.retrieveUser(req, function (userData) {
         if (userData) {
             res.json(userData);
         }
         else {
             res.send(401, "data not found in the table");
         }
     });
 });

router.get('/all/user/to/aids', function (req, res) {

     users.readUserToAids(function (userData) {
         if (userData) {
             res.json(userData);
         }
         else {
             res.send(401, "data not found in the table");
         }
     });
 });

router.get('/all/user/reception', function (req, res) {

     users.readForTontineRecep(function (userData) {
         if (userData) {
             res.json(userData);
         }
         else {
             res.send(401, "data not found in the table");
         }
     });
 });
router.get('/all/user', function (req, res) {

     users.retrieveAll(function (userData) {
         if (userData) {
             res.json(userData);
         }
         else {
             res.send(401, "data not found in the table");
         }
     });
 });
router.get('/user/actives', function (req, res) {

     users.read(function (userData) {
         if (userData) {
             res.json(userData);
         }
         else {
             res.send(401, "data not found in the table");
         }
     });
 });

router.post('/user/recouvrements', function (req, res) {
     finances.recouvrement(req, function (recouvrement) {
         if (recouvrement) {
             res.json(recouvrement);
         }
         else {
             res.send(401, "data not found in the table");
         }
     });
 });

router.post('/create/user', function (req, res) {

     users.data(req, function (err, userData) {
         if (err) {
             res.json(err);
         }
         else {
             res.json(userData);
         }
     });
 });

router.put('/update/user', function (req, res) {

     users.update(req, function (err, userData) {
         if (err) {
             res.json(err);
         }
         else {
             res.json(userData);
         }
     });
 });

router.post('/create/address', function (req, res) {

     address.data(req, function (err, userAddress) {
         if (err) {
             res.json(err);
         }
         else {
             res.json(userAddress);
         }
     });
 });

router.put('/update/address', function (req, res) {

     address.update(req, function (err, userAddress) {
         if (err) {
             res.json(err);
         }
         else {
             res.json(userAddress);
         }
     });
 });

router.get('/read/:id/address', function (req, res) {

     address.retrieveAll(req,function (userAddress) {
         if (userAddress) {
             res.json(userAddress);
         }
         else {
             res.send(401, "data not found in the table");
         }
     });
 });

router.get('/read/monthlyfees', function (req, res) {

     monthlyFees.readAll(function (monthlyfees) {
         if (monthlyfees) {
             res.json(monthlyfees);
         }
         else {
             res.send(401, "data not found in the table");
         }
     });
 });


router.get('/users/reports', function (req, res) {

     monthlyFees.activitiesReport(function (monthlyfees) {
         if (monthlyfees) {
             res.json(monthlyfees);
         }
         else {
             res.send(401, "data not found in the table");
         }
     });
 });


router.post('/insert/months/years', function (req, res) {

     monthlyFees.create(req, function (months) {
         if (months) {
             res.json(months);
         }
         else {
             res.send(401, "data not found in the table");
         }
     });
 });
router.post('/insert/monthly/fees', function (req, res) {

     monthlyFees.createUserPayments(req, function (months) {
         if (months) {
             res.json(months);
         }
         else {
             res.send(401, "data not found in the table");
         }
     });
 });
router.post('/insert/monthly/tontine', function (req, res) {

     monthlyFees.createUserTontine(req, function (months) {
         if (months) {
             res.json(months);
         }
         else {
             res.send(401, "data not found in the table");
         }
     });
 });

router.get('/read/finances', function (req, res) {

     finances.read(function (finances) {
         if (finances) {
             res.json(finances);
         }
         else {
             res.send(401, "data not found in the table");
         }
     });
 });

router.post('/report/category', function (req, res) {

     monthlyReport.readAll(req,function (report) {
         if (report) {
             res.json(report);
         }
         else {
             res.send(401, "report not found in the table");
         }
     });
 });
 router.post('/report/all/user/category', function (req, res) {

     monthlyReport.readAllUsers(req,function (report) {
         if (report) {
             res.json(report);
         }
         else {
             res.send(401, "report not found in the table");
         }
     });
 });

 router.post('/aids/payment', function (req, res) {
   
      userFinance.paymentsRec(req, function (paymentData) {
          if (paymentData) {
              res.json(paymentData);
          }
          else {
              res.send(401, "data not found in the table");
          }
      });
  });
module.exports = router;
