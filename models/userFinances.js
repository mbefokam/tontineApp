'use strict';
module.exports = function (sequelize, DataTypes) {
    var userFinance = sequelize.define('USERFINANCES', {
        id: {
            type: DataTypes.INTEGER
            , primaryKey: true
            , autoIncrement: true
            , allowNull: false
        }, uid: {
            type: DataTypes.INTEGER
            , allowNull: false
        }, tfid: {
            type: DataTypes.INTEGER
            , allowNull: false
        }, recouvrements: {
            type: DataTypes.DECIMAL(5, 2)
            ,defaultValue: '0'
        }, 
        aides: {
            type: DataTypes.DECIMAL(5, 2)
            ,defaultValue: '0'
        }
        , descriptions: {
            type: DataTypes.STRING
            ,defaultValue: ''
        },
        payments: {
            type: DataTypes.DECIMAL(5, 2)
            ,defaultValue: '0'
        },
        date: {
            type: DataTypes.STRING
            ,defaultValue: ''
        }, 
        dueDate: {
            type: DataTypes.STRING
            ,defaultValue: ''
        }, 
        totalPayments: {
            type: DataTypes.DECIMAL(5, 2)
            ,defaultValue: '0'
        },
        status: {
            type: DataTypes.STRING
            ,defaultValue: ''
        }
        
    }, {
        freezeTableName: true
        , tableName: 'userFinances'
        , timestamps: false
        , classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
        , instanceMethods: {
            create: function (req, onSuccess, onError) {
                userFinance.create(req, {}).then(onSuccess).error(onError);
            }
            , update: function (id, onSuccess, onError) {
                userFinance.update({
                    where: {
                        id: id
                    }
                }).then(onSuccess).error(onError);
            }
            , retrieveById: function ( /*req,*/ onSuccess, onError) {
                userFinance.find({
                    where: {
                        statusDeRecouvrement: 'active'
                    }
                }).then(onSuccess).error(onError);
            }
            , recouvrement: function ( onSuccess, onError) {
                userFinance.findAll({
                     attributes: ['uid']
                    /*where: {
                        statusDeRecouvrement: 'active'
                    }*/
                }).then(onSuccess).error(onError);
            }
        , }
    });
    return userFinance;
};