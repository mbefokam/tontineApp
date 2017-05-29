'use strict';
module.exports = function (sequelize, DataTypes) {
    var finances = sequelize.define('FINANCES', {
        id: {
            type: DataTypes.INTEGER
            , primaryKey: true
            , autoIncrement: true
            , allowNull: false
        },
        aides: {
            type: DataTypes.DECIMAL(10, 2)
            ,defaultValue: '0'
        }
        , recouvrements: {
            type: DataTypes.DECIMAL(10, 2)
            ,defaultValue: '0'
        }
        , descriptions: {
            type: DataTypes.STRING
            ,defaultValue: ''
        },
        totalspayments: {
            type: DataTypes.DECIMAL(10, 2)
            ,defaultValue: '0'
        },
        status: {
            type: DataTypes.STRING
            ,defaultValue: ''
        }
        , date: {
            type: DataTypes.STRING
            ,defaultValue: ''
        }
        , dueDate: {
            type: DataTypes.STRING
            ,defaultValue: ''
        }

        , totalAssrance: {
            type: DataTypes.DECIMAL(10, 2)
            ,defaultValue: '0'
        },
        totalInscription: {
            type: DataTypes.DECIMAL(10, 2)
            ,defaultValue: '0'
        }
    }, {
        freezeTableName: true
        , tableName: 'finances'
        , timestamps: false
        , classMethods: {
            associate: function (models) {
               finances.hasMany(models.USERFINANCES, {
                        foreignKey: 'tfid'
                    })
            }
        }
        , instanceMethods: {
            create: function (req, onSuccess, onError) {
                finances.create(req, {}).then(onSuccess).error(onError);
            }
            , update: function (id, onSuccess, onError) {
                finances.update({
                    where: {
                        id: id
                    }
                }).then(onSuccess).error(onError);
            }
            , read: function (onSuccess, onError) {
              console.log("I AM HERE ...")
                finances.findAll({
                  limit: 1,
                  order: [['id','DESC']]
                }).then(onSuccess).error(onError);
            }
            , recouvrement: function ( onSuccess, onError) {

                finances.findAll({
                  limit: 1,
                  order: [['id','DESC']]
                    /*where: {
                        statusDeRecouvrement: 'active'
                    }*/
                }).then(onSuccess).error(onError);
            }
        , }
    });
    return finances;
};
