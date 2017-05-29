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
            ,defaultValue: ''
        }
        , street2: {
            type: DataTypes.STRING
            ,defaultValue: ''
        }
        , city: {
            type: DataTypes.STRING
            ,defaultValue: ''
        }
        , state: {
            type: DataTypes.STRING
            ,defaultValue: ''
        }
        ,zipCode: { type: DataTypes.STRING
                   ,defaultValue: ''}
        
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