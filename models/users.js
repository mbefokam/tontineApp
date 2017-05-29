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
            ,defaultValue: ''
        }
        , lastName: {
            type: DataTypes.STRING
            ,defaultValue: ''
        }
        , assuranceStatus: {
            type: DataTypes.STRING
            ,defaultValue: ''
        },
        membership: {
            type: DataTypes.STRING
            ,defaultValue: ''
        }
        ,
        inscription: {
            type: DataTypes.DECIMAL(5, 2)
            ,defaultValue: '0'
        },
        inscriptionMonth: {
            type: DataTypes.STRING
            ,defaultValue: ''
        },
        year: {
            type: DataTypes.CHAR
            ,defaultValue: ''
        }
        , assurance: {
            type: DataTypes.DECIMAL(5, 2)
            ,defaultValue: '0'
        }
        , monthOfMeetingReception: {
            type: DataTypes.STRING
            ,defaultValue: ''
        }
        , monthOfTontineReception: {
            type: DataTypes.STRING
            ,defaultValue: ''
        }
        , tontineOnemontant: {
            type: DataTypes.DECIMAL(10, 2)
            ,defaultValue: '0'
        }
        , monthOfTontine2Reception: {
            type: DataTypes.STRING
            ,defaultValue: ''
        }
        , tontineTwomontant: {
            type: DataTypes.DECIMAL(10, 2)
            ,defaultValue: '0'
        }
        , phone: {
            type: DataTypes.STRING
            ,defaultValue: ''
        }
        , email: {
            type: DataTypes.STRING
            , allowNull: false
            , unique: true
        }  , admin: {
              type: DataTypes.STRING
              , allowNull: false

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
                    }),
                     users.hasMany(models.MONTHLY_REPORTS, {
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
            },
            readUserToAids: function (onSuccess, onError) {
                users.findAll({
                  attributes: ['firstName', 'lastName'],
                    where: {
                      $and: {
                         membership: "active"
                         ,assuranceStatus: "Insured"
                     }
                    }
                }).then(onSuccess).error(onError);
            },
            readForTontineRecep: function (onSuccess, onError) {
                users.findAll({
                  include: [
                      {
                          model: sequelize.import('./address.js')
                 }],
                  where: {
                       $and: {
                          membership: "active"
                          ,monthOfMeetingReception: {$ne: null}
                      }
                  }
                }).then(onSuccess).error(onError);
            },

            readOne: function (req, onSuccess, onError) {
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
            },
            retrieveUser: function (req, onSuccess, onError) {
                users.find({
                    include: [
                        {
                            model: sequelize.import('./address.js')
                   }, {
                            model: sequelize.import('./userFinances.js')
                   }, {
                            model: sequelize.import('./monthly_fees.js')
                   }, {
                            model: sequelize.import('./paymentHistory.js')
                   }, {
                            model: sequelize.import('./tontine.js')
                   }, {
                            model: sequelize.import('./monthlyReports.js')
                   }

           ]
                  ,
                   where: {
                       $and: {
                          membership: "active"
                          ,email: req.body.email
                      }
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
