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
        }
        , recouvrements: {
            type: DataTypes.DECIMAL(10, 2)
        }
        , descriptions: {
            type: DataTypes.STRING
        },
        totalspayments: {
            type: DataTypes.DECIMAL(10, 2)
        },
        status: {
            type: DataTypes.STRING
        }
        , date: {
            type: DataTypes.STRING
        }
        , dueDate: {
            type: DataTypes.STRING
        }
        
        , totalAssrance: {
            type: DataTypes.DECIMAL(10, 2)
        },
        totalInscription: {
            type: DataTypes.DECIMAL(10, 2)
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