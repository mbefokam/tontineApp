
var addresses = require('../models/index').ADDRESSES;
var async = require('async');
var empty = require('is-empty');

module.exports.read = function (req,cb) {
     var address = addresses.build();
    
    address.read(req, function (data) {
        cb(data);
    })
}

module.exports.create = function (req,cb) {
    var address = addresses.build();
    address.create(req.body,function (data) {
        cb(data);
    })
}

module.exports.update = function (req,cb) {
    var address = addresses.build();

    address.update(req.body, function (data) {
        cb(data);
    })
}
