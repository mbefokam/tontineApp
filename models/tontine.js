'use strict';
module.exports = function (sequelize, DataTypes) {
    var tontine = sequelize.define('TONTINE', {
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
        , tontineOneMontant: {
            type: DataTypes.DECIMAL(5, 2)
        }
        ,  tontineTwoMontant: {
            type: DataTypes.DECIMAL(5, 2)
        }
        , months: {
            type: DataTypes.STRING
        }, years: {
            type: DataTypes.CHAR(4)
        }
        
    }, {
        freezeTableName: true
        , tableName: 'tontine'
        , timestamps: false
        , classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
        , instanceMethods: {
            create: function (req, onSuccess, onError) {
            tontine.create(req, {}).then(onSuccess).error(onError);
            },
            update: function (req, onSuccess, onError) {
            tontine.update({
                    where: {
                        id: req.param.id
                    }
                }).then(onSuccess).error(onError);
            },
            read : function(req, onSuccess, onError){
            
            tontine.find({

                where: {
                        id: req.param.id
                    }

           }).then(onSuccess).error(onError);
         } 
        }
    });
    return tontine;
};