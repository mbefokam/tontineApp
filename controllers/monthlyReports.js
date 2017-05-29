var monthlyReports = require('../models/index').MONTHLY_REPORTS;
var users = require('../models/index').USERS;
var tMonthfees = require('../models/index').TOTAL_MONTHLYFEES;
var tontine = require('../models/index').TONTINE;
var async = require('async');
var empty = require('is-empty');


module.exports.readAll = function (req,cb) {

    var monthlyReport = monthlyReports.build();
    monthlyReport.readAll(req,function (data) {
        cb(data);
    })
}

module.exports.readAllUsers = function (req,cb) {

    var monthlyReport = monthlyReports.build();
    monthlyReport.readAllUsers(req,function (data) {
        cb(data);
    })
}