var userFinance = require('../models/index').USERFINANCES;
var users = require('../models/index').USERS;
var finance = require('../models/index').FINANCES;
var totalfinances = require('../models/index').TOTALASSURANCE;
var async = require('async');
var empty = require('is-empty');


module.exports.paymentsRec = function (req, cb) {

      async.waterfall([
          function(callback){
            var Userpayment = req.body
            var payment = Userpayment.payments

            if (Userpayment.payments >= Userpayment.recouvrements){

              var user = users.build();
              user.readOne(Userpayment,function (data) {
                  var name = data.firstName +", "+data.lastName+" has already paid off "+Userpayment.descriptions
                    callback(null, "paid", name);
              })

            }
             else {
               Userpayment.totalPayments = Userpayment.totalPayments + Userpayment.payments
    //           Userpayment.paymentDateDate =  Userpayment.paymentDateDate.split("T")[0]
               if (Userpayment.payments >= Userpayment.recouvrements)
               {
                 Userpayment.status = "paid"
               }

               var userF = userFinance.build();
               userF.update(Userpayment,function (data) {
                   //cb(data);
                     callback(null, data, req.body);
               })
             }
            },

          function(recoupay, recou, callback){

            if(recoupay == "paid"){
              callback(null, recoupay, recou,"paid off");
            }else{
              var totalfinance = totalfinances.build();
                totalfinance.read(function (data) {
                  var obj = JSON.stringify(data)
                  var financeReturn = JSON.parse(obj)
                  financeReturn.assurance = financeReturn.assurance + recou.payments
                  callback(null, recoupay, recou,financeReturn);
                })
            }
          },
          function(recoupay, recou, financeData, callback){

            if(recoupay == "paid"){
              callback(null, recoupay, recou,financeData);
            }else{

              var totalfinance = totalfinances.build();
                totalfinance.update(financeData,function (data) {

                  callback(null, recoupay, recou,data);
                })
            }
          },

          function(recoupay, recou,totalFin, callback){

            if(recoupay == "paid"){
              callback(null, recoupay, recou,totalFin);
            }
              else{
                var finances = finance.build();
                finances.read2(recou,function (data) {
                    var obj = JSON.stringify(data)
                    var financedata = JSON.parse(obj)
                      callback(null, recou, financedata ,totalFin);
                })

              }
           },
           function(request, financeT, totalFin, callback){

             if(request == "paid"){
               callback(null, financeT);
             }else{
               financeT.totalspayments = financeT.totalspayments + request.payments
               financeT.totalAssrance = financeT.totalAssrance + request.payments

               if (financeT.totalspayments >= financeT.aides){
                 financeT.status = "paid"
               }
               else{
                 financeT.status = "unpaid"
               }
               var finances = finance.build();
               finances.updatePayment(financeT ,function (data) {
                     console.log("HER............ "+data)
                     callback(null,  data);
               })
             }

           }
         ], function (err, result) {
           cb(result)
        });

}
