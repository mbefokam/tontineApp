'use strict';
module.exports = function (sequelize, DataTypes) {
    var monthly_fees = sequelize.define('MONTHLY_FEES', {
        id: {
            type: DataTypes.INTEGER
            , primaryKey: true
            , autoIncrement: true
            ,allowNull: false
        }
        , uid: {
            type: DataTypes.INTEGER
            , allowNull: false
        }
        , activitiesFees: {
            type: DataTypes.DECIMAL(5, 2)
        }, foodFees: {
            type: DataTypes.DECIMAL(5, 2)
        }
        , months: {
            type: DataTypes.STRING
            , allowNull: false
        }
        , years: {
            type: DataTypes.CHAR(4)
            , allowNull: false
        }
        
        
    }, {
        freezeTableName: true
        , tableName: 'monthly_fees'
        , timestamps: false
        , classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
        , instanceMethods: {
            /*bulkCreate: function (req, onSuccess, onError) {
                monthly_fees.bulkCreate(req, {
                    individualHooks: true
                }).then(onSuccess).error(onError);
            },*/
            create: function (req, onSuccess, onError) {
                monthly_fees.create(req, {
                }).then(onSuccess).error(onError);
            },
            update: function (req, onSuccess, onError) {
                monthly_fees.update({
                    where: {
                        id: req.param.id
                    }
                }).then(onSuccess).error(onError);
            },
            read : function(req, onSuccess, onError){
            
            monthly_fees.find({

                where: {
                        id: req.param.id
                    }

           },{ raw: true}).then(onSuccess).error(onError);
         },
            readAll : function(onSuccess, onError){
            
            monthly_fees.findAll({
             

           }).then(onSuccess).error(onError);
         }  
        }
    });
    return monthly_fees;
};