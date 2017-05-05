var monthfees = require('../models/index').MONTHLY_FEES;
var users = require('../models/index').USERS;
var tMonthfees = require('../models/index').TOTAL_MONTHLYFEES;
var tontine = require('../models/index').TONTINE;
var async = require('async');
var empty = require('is-empty');



module.exports.createUserPayments = function (req, cb) {
    var response = new Array();
    monthArrays = req.body
    async.forEachLimit(monthArrays, 1, function (monthArray, dataCallback) {
        async.waterfall([
         function (callback) {
                var tmonthfees = tMonthfees.build();
             
                tmonthfees.read(monthArray,function (data) {
                if (data.totalActivitiesFees ) {}
                else
                {data.totalActivitiesFees = 0.00}
                    if (data.totalFoodFees){}
                    else{data.totalFoodFees = 0.00}
                    data.totalActivitiesFees = data.totalActivitiesFees + monthArray.activitiesFees
                    data.totalFoodFees = monthArray.foodFees + data.totalFoodFees
                    

                    callback(null, data,monthArray)
                })
            }
            
         , function (tmonth, monthArray, callback) {
                 
                var monthfee = monthfees.build();
                    monthfee.create(monthArray,function (data) {
                        response.push(tmonth)
                        response.push(data)
                    })
             callback(null, response,tmonth)
            }  , function (response, monthData, callback) {                
                var monthly = updateMonthlyfees(monthData)     
                var tmonthfees = tMonthfees.build();
                tmonthfees.update(monthly, function (data) {
                    callback(null, data);
                })
            }
    ], function (err, result) {
           // response.push(hfAndLoc)
            dataCallback(response)
        });
    }, function (err) {
        console.log("Monthly Fees For Loop Completed");
        cb(response);
    });
}

module.exports.createUserTontine = function (req, cb) {
    var response = new Array();
    monthArrays = req.body
    async.forEachLimit(monthArrays, 1, function (monthArray, dataCallback) {
        async.waterfall([
         function (callback) {
                var tmonthfees = tMonthfees.build();
             
                tmonthfees.read(monthArray,function (data) {
                if (data.totalTontineOne ) {}
                else
                {data.totalTontineOne = 0.00}
                    if (data.totalTontineTwo){}
                    else{data.totalTontineTwo = 0.00}
                    data.totalTontineOne = data.totalTontineOne + monthArray.totalTontineOne
                    data.totalTontineTwo = monthArray.totalTontineTwo + data.totalTontineTwo
                    

                    callback(null, data,monthArray)
                })
            }
            
         , function (tmonth, monthArray, callback) {
                 
                var tontines = tontine.build();
                    tontines.create(monthArray,function (data) {
                        response.push(tmonth)
                        response.push(data)
                    })
             callback(null, response,tmonth,monthArray)
            }
        , function (response, monthData,monthArray, callback) {                
                var monthly = updateMonthlyfees(monthData)     
                var tmonthfees = tMonthfees.build();
                tmonthfees.update(monthly, function (data) {
                    response.push(monthly)
                    callback(null, response,monthArray);
                })
        }, function (response, monthArray, callback) {                  
                var user = users.build();
                user.readOne(monthArray, function (data) {
                   
                 data.tontineOnemontant   = data.tontineOnemontant + monthArray.totalTontineOne
                 data.tontineTwomontant   = data.tontineTwomontant + monthArray.totalTontineTwo
                    callback(null, response,data);
                })
        }
        , function (response, userD, callback) {                  
                var user = users.build();
                var userData = userObject (userD)
                user.update(userData, function (data) {
                  response.push(data) 
                  callback(null, response);
                })
        }
    ], function (err, result) {
           // response.push(hfAndLoc)
            dataCallback(response)
        });
    }, function (err) {
        console.log("Monthly Fees For Loop Completed");
        cb(response);
    });
}

function updateMonthlyfees(data){
    
    var returnData = {
        "months": "",
        "years": "",
        "totalFoodFees": 0.00,
        "totalActivitiesFees":"",
        "totalTontineOne": "",
        "totalTontineTwo": 0.00
    }
    returnData.months  = data.months
    returnData.years = data.years
    returnData.totalFoodFees = data.totalFoodFees
    returnData.totalActivitiesFees = data.totalActivitiesFees
    returnData.totalTontineOne = data.totalTontineOne
    returnData.totalTontineTwo = data.totalTontineTwo
    
    
    return returnData
}



module.exports.create = function (req, cb) {
    var tmonthfees = tMonthfees.build();
    tmonthfees.create(req.body, function (data) {
        cb(data);
    })
}
module.exports.update = function (req, cb) {
    var address = monthfees.build();
    monthfee.update(req.body, function (data) {
        cb(data);
    })
}
module.exports.readAll = function (cb) {
    var monthfee = monthfees.build();
    monthfee.readAll(function (data) {
        cb(data);
    })
}

function userObject (data){
   var user = { id: 0,
     firstName: '',
     lastName: '',
     assuranceStatus: '',
     membership: '',
     inscription: 0.00,
     inscriptionMonth: '',
     year: '',
     assurance: 0.00,
     monthOfMeetingReception: '',
     monthOfTontineReception: '',
     tontineOnemontant: 0.00,
     monthOfTontine2Reception: '',
     tontineTwomontant: 0.00,
     phone: '',
     email: '' }
    
    user.id = data.id
    user.firstName  = data.firstName
    user.lastName = data.lastName
    user.assuranceStatus = data.assuranceStatus
    user.membership = data.membership
    user.inscription = data.inscription
    user.inscriptionMonth = data.inscriptionMonth
    user.year = data.year
    user.assurance = data.assurance
    user.monthOfMeetingReception = data.monthOfMeetingReception
    user.monthOfTontineReception = data.monthOfTontineReception
    user.tontineOnemontant = data.tontineOnemontant
    user.monthOfTontine2Reception = data.monthOfTontine2Reception
    user.tontineTwomontant = data.tontineTwomontant
    user.phone = data.phone
    user.email = data.email
    
    return user
   
}