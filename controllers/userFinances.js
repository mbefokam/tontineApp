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

            if (Userpayment.payments == Userpayment.recouvrements){

              var user = users.build();
              user.readOne(Userpayment,function (data) {
                  var name = data.firstName +", "+data.lastName+" has already paid off "+Userpayment.descriptions
                    callback(null, "paid", name);
              })

            }
             else {

               Userpayment.totalPayments = Userpayment.totalPayments + Userpayment.payments
    //           Userpayment.paymentDateDate =  Userpayment.paymentDateDate.split("T")[0]
               if (Userpayment.payments == Userpayment.recouvrements)
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
              callback(null, recoupay, recou);
            }else{
              var totalfinance = totalfinances.build();
                totalfinance.read(function (data) {
                  var obj = JSON.stringify(data)
                  var financeReturn = JSON.parse(obj)
                    console.log("testing before......... "+ obj)
                    console.log("testing financeReturn ........."+ financeReturn)
                    console.log("testing recoupay.payments ........."+ recoupay.payments)
                    console.log("testing recoupay.recou ........."+ recou.payments)
                  financeReturn.assurance = financeReturn.assurance + recou.payments
                    console.log("testing financeReturn after........."+ financeReturn)
                  callback(null, recoupay, recou,financeReturn);
                })
            }
          },
          function(recoupay, recou, financeData,callback){

            if(recoupay == "paid"){
              callback(null, recoupay, recou);
            }else{

              var totalfinance = totalfinances.build();
                totalfinance.update(financeData,function (data) {

                  callback(null, recoupay, recou,data);
                })
            }
          },

          function(recoupay, recou,totalFin, callback){

            if(recoupay == "paid"){
              callback(null, recoupay, recou);
            }
              else{
                var finances = finance.build();
                finances.readAid(recou,function (data) {
                  var obj = JSON.stringify(data)
                  var financeData = JSON.parse(obj)

                      callback(null, recou, financeData,totalFin);
                })

              }
           },
           function(request, financeT, totalFin, callback){

             if(request == "paid"){
               callback(null, financeT);
             }else{

               financeT.totalspayments = financeT.totalspayments + request.payments
               financeT.totalAssrance = financeT.totalAssrance + request.payments

               if (financeT.totalPayments == financeT.aids){
                 financeT.status = "paid"
               }
               else{
                 financeT.status = "unpaid"
               }
              //  console.log("I AM HERE AFTER ...")
              //  console.log(financeT)
               var finances = finance.build();
               finances.updatePayment(financeT ,function (data) {

                     callback(null,  data);
               })
             }

           }
         ], function (err, result) {
           cb(result)
        });

        function assuranceUpdate ( data){

          var finance = {
          "id":0,
          "aides":150,
  				"recouvrements":300,
  				"descriptions":"naissance du bebe",
  				"totalspayments":50,
  				"date":"2017-04-27",
  				"dueDate":"2017-07-27",
  				"totalAssrance":"2017-05-29",
  				"totalInscription":0
          }

          return finance

        }

}
