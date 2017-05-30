var users = require('../models/index').USERS;
var address = require('../models/index').ADDRESSES;
var accoutFinances = require('../models/index').FINANCES;
var userFinances = require('../models/index').USERFINANCES;
var address = require('../models/index').MONTHLY_FEES;
var totalfinances = require('../models/index').TOTALASSURANCE;
var async = require('async');
var empty = require('is-empty');




module.exports.read = function (cb) {

    var finance = accoutFinances.build();
    finance.read(function (data) {
        cb(data);
    })
}

module.exports.readAccount = function (cb) {

    var finance = totalfinances.build();
    finance.read(function (data) {
        cb(data);
    })
}



module.exports.recouvrement = function (aideMembre, cb) {

    async.waterfall([

    function (callback) {

          var date1 = aideMembre.body.date.split("T")[0]
          var duDate1 = aideMembre.body.dueDate.split("T")[0]

            aideMembre.body.date = date1
            aideMembre.body.dueDate = duDate1

            var finance = accoutFinances.build();
            finance.read(function (data) {
             var financeObj = financefunc (aideMembre.body, data)
             callback(null,financeObj)
    })
    },
    function (financeObj, callback) {

            var user = users.build()
            var finObj = financeObj
            user.read(function (userArray) {
                var numberOfmember = userArray.length
                var recouvrement = (finObj.aides / numberOfmember).toFixed(2)
                finObj.recouvrements = recouvrement
                callback(null, finObj, userArray)
            })

     },
     function (financeObj, userArray, callback) {
            // var usearray = userArray
             var afinance = accoutFinances.build();
             afinance.create(financeObj,function (aideRec) {

             callback(null ,aideRec ,userArray)
    })
  },
          function (aideRec, userArrays, callback) {
            var ufinance = userFinances.build()
            var user = users.build()
            var financeArr = [];
            var userRec = insertRecouvrement(aideRec)

            userArrays.forEach(function (userArray, index) {
                userRec.uid = userArray.id
                ufinance.create(userRec, function (data) {
                    userArray.assurance = userArray.assurance - data.recouvrements

                    userupdate = updateUser(userArray)
                    financeArr.push(userupdate)
                })
            })
            callback(null, financeArr);
  }
], function (err, result) {
        cb(result);
    });
}

function updateUser(userData) {
    var returnData;
    var exp = {
        "id": userData.id
        , "firstName": userData.firstName
        , "lastName": userData.lastName
        , "assuranceStatus": userData.assuranceStatus
        , "membership": userData.membership
        , "inscription": userData.inscription
        , "inscriptionMonth": userData.inscriptionMonth
        , "assurance": userData.assurance
        , "monthOfMeetingReception": userData.monthOfMeetingReception
        , "monthOfTontineReception": userData.monthOfTontineReception
        , "tontineOnemontant": userData.tontineOnemontant
        , "monthOfTontine2Reception": userData.monthOfTontine2Reception
        , "tontineTwomontant": userData.tontineTwomontant
        , "phone": userData.phone
        , "email": userData.email
    }
    var user = users.build()
    user.update(exp, function (data) {
        returnData = data
    })
    return returnData;
}

function insertRecouvrement(recouvrement){

    var returnData = {
        "uid": 0,
        "tfid": 0,
        "recouvrements": 0.00,
        "aides":"",
        "descriptions": "",
        "payments": 0.00,
        "date": "",
        "dueDate": "",
        "totalspayments": 0.00,
        "status": "unpaid"
    }
    var tfid =  recouvrement.id
    returnData.tfid  = tfid
    returnData.recouvrements = recouvrement.recouvrements
    returnData.aides = recouvrement.aides
    returnData.descriptions = recouvrement.descriptions
    returnData.date = recouvrement.date
    returnData.dueDate = recouvrement.dueDate
    returnData.totalspayments = recouvrement.totalspayments


    return returnData
}

function financefunc (recouvrement, finance){
 console.log(recouvrement)
    var financeObj = {
        "aides": 0.00,
        "recouvrements": 0.00,
        "descriptions": " ",
        "totalspayments": 0.00,
        "status": "unpaid",
        "date": "null",
        "dueDate": null,
        "totalAssrance": 0.00,
        "totalInscription": 0.00
    }
    financeObj.aides = recouvrement.aides
    financeObj.descriptions = recouvrement.descriptions
    financeObj.date = recouvrement.date
    financeObj.dueDate = recouvrement.dueDate
    financeObj.totalAssrance = finance[0].totalAssrance - recouvrement.aides
    financeObj.totalInscription = finance[0].totalInscription

    return financeObj

}
