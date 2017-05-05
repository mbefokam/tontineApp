'use strict';
module.exports = function (sequelize, DataTypes) {
    var address = sequelize.define('ADDRESSES', {
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
        , street: {
            type: DataTypes.STRING
        }
        , street2: {
            type: DataTypes.STRING
        }
        , city: {
            type: DataTypes.STRING
        }
        , state: {
            type: DataTypes.STRING
        }
        ,zipCode: { type: DataTypes.STRING}
        
        
    }, {
        freezeTableName: true
        , tableName: 'addresses'
        , timestamps: false
        , classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
        , instanceMethods: {
            create: function (req, onSuccess, onError) {
                address.create(req, {}).then(onSuccess).error(onError);
            },
            update: function (req, onSuccess, onError) {
                address.update({
                    where: {
                        id: req.param.id
                    }
                }).then(onSuccess).error(onError);
            },
            read : function(req, onSuccess, onError){
            
            address.find({

                where: {
                        id: req.param.id
                    }

           }).then(onSuccess).error(onError);
         } 
        }
    });
    return address;
};