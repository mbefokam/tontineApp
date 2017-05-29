var monthfees = require('../models/index').MONTHLY_REPORTS;
var users = require('../models/index').USERS;
var tMonthfees = require('../models/index').TOTAL_MONTHLYFEES;
var async = require('async');
var empty = require('is-empty');






module.exports.createUserPayments = function (req, cb) {
    var response = new Array();
    monthArrays = req.body
    console.log("I AM HERE......monthArray")
               console.log(monthArrays.length)
   async.forEach(monthArrays, function (monthArray, dataCallback) {
  //   async.each(monthArrays,function(monthArray,dataCallback) {   
        async.waterfall([
         function (callback) {
                var tmonthfees = tMonthfees.build();
               
                tmonthfees.read(monthArray,function (tmonth) {
                if (tmonth.totalActivitiesFees ) {}
                else
                {tmonth.totalActivitiesFees = 0.00}
                if (tmonth.totalFoodFees){}
                else{tmonth.totalFoodFees = 0.00}
                    tmonth.totalActivitiesFees = tmonth.totalActivitiesFees + monthArray.activitiesFees
                    tmonth.totalFoodFees = monthArray.foodFees + tmonth.totalFoodFees
                    var monthly = updateMonthlyfees(tmonth)

                    tmonthfees.update(monthly, function (data) {
                    response.push(data)
                     })


                   callback(null, tmonth,monthArray)
                })
                 
            }
            
          , function (tmonth, monthArray, callback) {
                 
                 var monthfee = monthfees.build();
                     monthfee.create(monthArray,function (data) {
                     response.push(data)
                     })
              callback(null, response,tmonth)
             }
            ,function (response, tmonth, callback) {                
                var monthly = updateMonthlyfees(tmonth)     
                var tmonthfees = tMonthfees.build();
                tmonthfees.update(monthly, function (data) {
                    callback(null, data);
                })
            }
    ], function (err, result) {
            response.push(result)
            dataCallback()
        });
    }, function (err) {
        console.log("Monthly Fees For Loop Completed");
        cb(response);
    });
}




















//module.exports.createUserPayments = function (req, cb) {
//    var response = new Array();
//    monthArrays = req.body
//    console.log("I AM HERE......monthArray")
//               console.log(monthArrays.length)
//   async.forEach(monthArrays, function (monthArray, dataCallback) {
//   //  async.each(monthArrays,function(monthArray,dataCallback) {   
//        
//                var tmonthfees = tMonthfees.build();
//               
//                tmonthfees.read(monthArray,function (tmonth) {
//                if (tmonth.totalActivitiesFees ) {}
//                else
//                {tmonth.totalActivitiesFees = 0.00}
//                if (tmonth.totalFoodFees){}
//                else{tmonth.totalFoodFees = 0.00}
//                    tmonth.totalActivitiesFees = tmonth.totalActivitiesFees + monthArray.activitiesFees
//                    tmonth.totalFoodFees = monthArray.foodFees + tmonth.totalFoodFees
//                    var monthly = updateMonthlyfees(tmonth)
//
//                    tmonthfees.update(monthly, function (data) {
//                    response.push(data)
//                     })
//
//                })
//                  var monthfee = monthfees.build();
//                    monthfee.create(monthArray,function (data) {
//                      response.push(data)
//                    })
//       
//       dataCallback
//    
//    }, function (err) {
//        console.log("Monthly Fees For Loop Completed");
//        dataCallback(response);
//    });
//    cb(response)
//}

module.exports.createUserTontine = function (req, cb) {
    var response = new Array();
    monthArrays = req.body
    var lenght = monthArrays.length
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

            response.push(result)
            dataCallback()
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


module.exports.activitiesReport = function (cb) {
    var reports = []
     async.waterfall([
         function (callback) {
              var monthfee = monthfees.build();
                  monthfee.readAll(function (data) {
                callback(null, data);
             })  
            }
            
         , function (userMonthlyDatas, callback) {


            async.forEach(userMonthlyDatas, function(userMonthlyData, userCallback){

                        var  readUser =  users.build();
                        readUser.readOne(userMonthlyData ,function (data) {
                      
                        var report = userReport(userMonthlyData, data)
                        reports.push(report)
                        // console.log('I AM HERE ...');
                        // console.log(JSON.stringify(report))
                        userCallback()
                     })
  

            }, function(err){
                  console.log("User For Loop Completed");
                  console.log(JSON.stringify(reports))
                  callback(reports)
            })

           }
         ], function (err, result) {
            console.log("ALL DONE....");
            cb(reports)
        });

}


function userReport (data, userData){
   var user = {
            "member":"",
            "JAN":"",
            "FEB":"",
            "MAR":"",
            "APR":"",
            "MAY":"",
            "JUN":"",
            "JUL":"",
            "AUG":"",
            "SEPT":"",
            "OCT":"",
            "NOV":"",
            "DEC":"",
            "TOTAL":""
            }
    
    user.member = userData.firstName + ", "+userData.lastName
    user.JAN  = checkUndefined(data.JAN)
    user.FEB = checkUndefined(data.FEB)
    user.MAR = checkUndefined(data.MAR)
    user.APR = checkUndefined(data.APR)
    user.MAY = checkUndefined(data.MAY)
    user.JUN = checkUndefined(data.JUN)
    user.JUL = checkUndefined(data.JUL)
    user.AUG = checkUndefined(data.AUG)
    user.SEPT = checkUndefined(data.SEPT)
    user.OCT = checkUndefined(data.OCT)
    user.NOV = checkUndefined(data.NOV)
    user.DEC = checkUndefined(data.DEC)
    user.TOTAL = checkUndefined(data.JAN) + checkUndefined(data.FEB)  +  checkUndefined(data.MAR) +  checkUndefined(data.APR)  +  checkUndefined(data.MAY) +  checkUndefined(data.JUN)  +  checkUndefined(data.JUL)  + checkUndefined(data.AUG ) +    checkUndefined(data.SEPT) + checkUndefined(data.OCT) +  checkUndefined(data.NOV)  + checkUndefined(data.DEC)
    
    // console.log('I AM HERE ...');
    // console.log(JSON.stringify(data))
    // console.log(JSON.stringify(userData))
    // console.log(JSON.stringify(user))

    return user
   
}

function checkUndefined (data){

    if(data=="undefined"){
        data = 0
    }

    return data
}