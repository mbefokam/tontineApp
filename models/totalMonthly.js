'use strict';
module.exports = function (sequelize, DataTypes) {
    var totalmonthlyfees = sequelize.define('TOTAL_MONTHLYFEES', {
        months: {
            type: DataTypes.STRING
            , primaryKey: true
            , allowNull: false
        }
        , years: {
            type: DataTypes.CHAR(4)
            , primaryKey: true
            , allowNull: false
        }, totalFoodFees: {
            type: DataTypes.DECIMAL(5, 2)
        }, totalActivitiesFees: {
            type: DataTypes.DECIMAL(5, 2)
        }
        , totalTontineOne: {
            type: DataTypes.DECIMAL(5, 2)
        }
        ,  totalActivitiesFees: {
            type: DataTypes.DECIMAL(5, 2)
        }
         , totalTontineTwo: {
            type: DataTypes.DECIMAL(5, 2)
        }
        
        
    }, {
        freezeTableName: true
        , tableName: 'totalMonthly'
        , timestamps: false
        , classMethods: {
            associate: function (models) {
                totalmonthlyfees.hasMany(models.MONTHLY_FEES, {
                       foreignKey: 'months' //['months','years']
                         
                    })
                   , totalmonthlyfees.hasMany(models.MONTHLY_FEES, {
                        foreignKey: 'years'//['months','years']
                         
                    })
                   ,totalmonthlyfees.hasMany(models.TONTINE, {
                        foreignKey: 'months' //['months','years']
                    }),totalmonthlyfees.hasMany(models.TONTINE, {
                        foreignKey: 'years'//['months','years']
                    })
            }
        }
        , instanceMethods: {
            create: function (req, onSuccess, onError) {
                totalmonthlyfees.create(req, {
                }).then(onSuccess).error(onError);
            },
            update: function (req, onSuccess, onError) {
                
                totalmonthlyfees.update(req, {
                    where: {
                         $and: {
                            months: req.months
                            ,years: req.years
                        }
                    }
                }).then(onSuccess).error(onError);
            },
            read : function(req, onSuccess, onError){
            totalmonthlyfees.find({

                where: {
                        $and: {
                            months: req.months
                            ,years: req.years
                        }
                    }

           }).then(onSuccess).error(onError);
         },
            readAll : function(onSuccess, onError){
            
            totalmonthlyfees.findAll({
             

           },{ raw: true}).then(onSuccess).error(onError);
         }  
        }
    });
    return totalmonthlyfees;
};