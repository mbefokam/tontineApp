var users = require('../models/index').USERS;
var address = require('../models/index').ADDRESSES;
var reference_data = require('../models/index').FINANCES;
var address = require('../models/index').MONTHLY_FEES;
var async = require('async');
var empty = require('is-empty');
var hfAndLoc = new Array();
var response = new Array();
var activeHf = new Array();

module.exports.data = function (req,cb) {
    var user = users.build();
    
    user.createUser(req.body, function (data) {
        cb(data);
    })
}

module.exports.retrieveAll = function (cb) {
    
    var user = users.build();
    user.retrieveAll(function (data) {
        cb(data);
    })
}

module.exports.read = function (cb) {
   
    var user = users.build();
    user.read(function (data) {
        cb(data);
    })
}

module.exports.update = function (req,cb) {
    var user = users.build();

    user.update(req.body, function (data) {
        cb(data);
    })
}

//module.exports.delete = function (cb) {
//        async.waterfall([
//
//            function (callback) {
//                var location = address.build();
//                location.delete(function (data) {
//                    callback(data);
//                })
//            }
//
//            ], function (err, noData) {
//            var healthData = healthfacilitie.build();
//            healthData.delete(function (data) {
//                cb(data);
//            })
//        })
//    }


// load the data from the 
//module.exports.insertData = function (req, cb) {
//    var health_facilitie;
//    var heathFArrs = req;
//    var location;
//    var reference;
//     
//    async.forEachLimit(heathFArrs, 1, function (heathFArr, dataCallback) {
//        health_facilitie = {
//            "name_1": heathFArr.name_1
//            , "name_2": heathFArr.name_2
//            , "Quartet": "Inactive"
//        };
//        location = {
//            "street_1": heathFArr.street_1
//            , "street_2": heathFArr.street_2
//            , "city": heathFArr.city
//            , "zip": heathFArr.zip
//            , "phone": heathFArr.phone
//            , "website": heathFArr.website
//            , "latitude": heathFArr.latitude
//            , "longitude": heathFArr.longitude
//        };
//        async.waterfall([
//         function (callback) {
//                var facilitie = healthfacilitie.build();
//                facilitie.readby_fields(health_facilitie, function (healthFacilitie) {
//                    callback(null, healthFacilitie);
//                });
//            },
//         function (healthFacilitie, callback) {
//                if(healthFacilitie){
//                   if(healthFacilitie.Quartet =="active"){
//                      activeHf.push(healthFacilitie) 
//                       callback(null, healthFacilitie)
//                   }else{
//                      callback(null, healthFacilitie) 
//                   }
//                  
//                }
//                else{
//                    if(location.zip=="10001"){
//                    health_facilitie.Quartet ="active"
//                    var facilitie = healthfacilitie.build()
//                   facilitie.createFacilities(health_facilitie, function (healthFacilitie) {
//                    callback(null, healthFacilitie)
//                        });  
//                    }
//                  else{
//                      var facilitie = healthfacilitie.build()
//                     facilitie.createFacilities(health_facilitie, function (healthFacilitie) {
//                    callback(null, healthFacilitie)
//                   }); 
//                  }
//                }
//                
//            },
//         function (healthFacilitie, callback) {
//                location.hf_id = healthFacilitie.id
//                var locations = address.build()
//                locations.readby_fields(location, function (locationData) {
//                    callback(null,healthFacilitie, location ,locationData)
//                });
//            }
//            ,
//            function (healthFacilitie, location ,locationData, callback) {
//                if(locationData){
//                    hfAndLoc.push(healthFacilitie)
//                    hfAndLoc.push(locationData)
//                  callback(null, response)
//                }
//                else{
//                var locations = address.build()
//                 locations.createAddress(location, function (locationData) {
//                   hfAndLoc.push(healthFacilitie)
//                   hfAndLoc.push(locationData)
//                  callback(null, response)
//               }) 
//                }
//                
//            }
//    ], function (err, result) {
//            console.log('done') 
//            response.push(hfAndLoc)
//            dataCallback()
//        });
//    }, function (err) {
//        response.push(activeHf)
//        console.log("Health Facilities For Loop Completed");
//        cb(response);
//    });
//    
//}