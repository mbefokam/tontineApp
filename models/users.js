'use strict';
module.exports = function (sequelize, DataTypes) {
    var users = sequelize.define('USERS', {
        id: {
            type: DataTypes.INTEGER
            , primaryKey: true
            , autoIncrement: true
            , allowNull: false
        }
        , firstName: {
            type: DataTypes.STRING
        }
        , lastName: {
            type: DataTypes.STRING
        }
        , assuranceStatus: {
            type: DataTypes.STRING
        },
        membership: {
            type: DataTypes.STRING
        }
        ,
        inscription: {
            type: DataTypes.DECIMAL(5, 2)
        },
        inscriptionMonth: {
            type: DataTypes.STRING
        },
        year: {
            type: DataTypes.CHAR
        }
        , assurance: {
            type: DataTypes.DECIMAL(5, 2)
        }
        , monthOfMeetingReception: {
            type: DataTypes.STRING
        }
        , monthOfTontineReception: {
            type: DataTypes.STRING
        }
        , tontineOnemontant: {
            type: DataTypes.DECIMAL(10, 2)
        }
        , monthOfTontine2Reception: {
            type: DataTypes.STRING
        }
        , tontineTwomontant: {
            type: DataTypes.DECIMAL(10, 2)
        }
        , phone: {
            type: DataTypes.STRING
        }
        , email: {
            type: DataTypes.STRING
            , allowNull: false
            , unique: true
        }
    }, {
        freezeTableName: true
        , tableName: 'users'
        , timestamps: false
        , classMethods: {
            associate: function (models) {
                    users.hasOne(models.ADDRESSES, {
                        foreignKey: 'uid'
                    })
                    , users.hasMany(models.USERFINANCES, {
                        foreignKey: 'uid'
                    })
                   , users.hasMany(models.PAYMENT_HISTORY, {
                        foreignKey: 'uid'
                    })
                    , users.hasMany(models.MONTHLY_FEES, {
                        foreignKey: 'uid'
                    })
                   , users.hasMany(models.TONTINE, {
                        foreignKey: 'uid'
                    })
                
            }
        }
        , instanceMethods: {
            createUser: function (req, onSuccess, onError) {
                users.create(req, {
                    include: [
                        {
                            model: sequelize.import('./address.js')
                   }
                        , {
                            model: sequelize.import('./userFinance.js')
                   }
                        , {
                            model: sequelize.import('./monthly_fees.js')
                   }
               ]
                }).then(onSuccess).error(onError);
            },
            retrieveById: function ( /*req,*/ onSuccess, onError) {
                finances.findAll({
                    where: {
                        membership: 'active'
                    }
                }).then(onSuccess).error(onError);
            }
            
            
            , create: function (req, onSuccess, onError) {
                
                users.create(req, {
                    include: [
                        {
                            model: sequelize.import('./address.js')
                   }
                        , {
                             model: sequelize.import('./userFinances.js')
                   }
                        , {
                            model: sequelize.import('./monthly_fees.js')
                   }
                        , {
                            model: sequelize.import('./paymentHistory.js')
                   }
                        , {
                            model: sequelize.import('./tontine.js')
                   }
               ]
                }).then(onSuccess).error(onError);
            }
            , read: function (onSuccess, onError) {
                users.findAll({
                    where: {
                        membership: "active"
                    }
                }).then(onSuccess).error(onError);
            }, readOne: function (req, onSuccess, onError) {
                users.find({
                    where: {
                        id: req.uid
                    }
                }).then(onSuccess).error(onError);
            }
            , retrieveAll: function (onSuccess, onError) {
               // console.log("I AM HERE...............")
                users.findAll({
                    include: [
                        {
                            model: sequelize.import('./address.js')
                   }
                        , {
                             model: sequelize.import('./userFinances.js')
                   }
                        , {
                            model: sequelize.import('./monthly_fees.js')
                      }, {
                            model: sequelize.import('./paymentHistory.js')
                   }/*, {
                            model: sequelize.import('./tontine.js')
                   }*/

                    ]
                    , where: {
                        membership: "active"
                    }
                }).then(onSuccess).error(onError);
            }
            , retrieve: function (req, onSuccess, onError) {
                users.find({
                    include: [
                        {
                            model: sequelize.import('./address.js')
                   }
                        , {
                            model: sequelize.import('./userFinances.js')
                   }
                        , {
                            model: sequelize.import('./monthly_fees.js')
                   }, {
                            model: sequelize.import('./paymentHistory.js')
                   }, {
                            model: sequelize.import('./tontine.js')
                   }

           ]
                    , where: {
                        $and: {
                            id: 1000
                            , membership: "active"
                        }
                    }
                }).then(onSuccess).error(onError);
            }
            , update: function (req, onSuccess, onError) {
                console.log(req)
                users.update(req,{
                    where: {
                        id: req.id
                    }
                }).then(onSuccess).error(onError);
            }
            , delete: function (onSuccess, onError) {
                users.destroy({
                    where: {
                        id: {
                            $ne: null
                        }
                    }
                }).then(onSuccess).error(onError);
            }
        }
    });
    return users;
};