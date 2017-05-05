var express = require('express');
var router = express.Router();
var request = require("request");
var users = require('../controllers/users')
var address = require('../controllers/addresses')
var finances = require('../controllers/finances')
var monthlyFees = require('../controllers/monthlypayments')

router.get('/user', function (req, res) {
     
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





//router.delete('/data', function (req, res) {
//    
//     health_facilities.delete(function (healthData) {
//         if (healthData) {
//             res.json(healthData);
//         }
//         else {
//             res.send(401, "data not found in the table");
//         }
//     });
// });
//
//router.get('/data', function (req, res) {
//    var resObj = {
//        url: "https://data.cityofnewyork.us/resource/8nqg-ia7v.json"
//        , method: 'GET'
//        , json: req.body
//    };
//    request(resObj, function (error, response, body) {
//        if (error) {
//            res.send(response.statusCode);
//        }
//        else {
//            health_facilities.insertData(body, function (success) {
//                if (success) {
//                    res.json(success);
//                }
//                else {
//                    res.json(401, "not data to return.");
//                }
//            }, function (err) {
//                res.status(500).json(err);
//            });
//            
//        }
//    });
//});
//router.get('/health/facilities', function (req, res) {
//    
//     health_facilities.data(function (healthData) {
//         if (healthData) {
//             res.json(healthData);
//         }
//         else {
//             res.send(401, "data not found in the table");
//         }
//     });
// });
module.exports = router;