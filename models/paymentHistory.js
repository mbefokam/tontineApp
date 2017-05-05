'use strict';
module.exports = function (sequelize, DataTypes) {
    var paymentHistory = sequelize.define('PAYMENT_HISTORY', {
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
        , payments: {
            type: DataTypes.DECIMAL(5, 2)
        }
        , reasons: {
            type: DataTypes.STRING
        }
        , date: {
            type: DataTypes.DATE
        }
        
    }, {
        freezeTableName: true
        , tableName: 'paymentHistory'
        , timestamps: false
        , classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
        , instanceMethods: {
            address: function (req, onSuccess, onError) {
            paymentHistory.create(req, {}).then(onSuccess).error(onError);
            },
            update: function (req, onSuccess, onError) {
            paymentHistory.update({
                    where: {
                        id: req.param.id
                    }
                }).then(onSuccess).error(onError);
            },
            retrieveById : function(req, onSuccess, onError){
            
            paymentHistory.find({

                where: {
                        id: req.param.id
                    }

           }).then(onSuccess).error(onError);
         } 
        }
    });
    return paymentHistory;
};