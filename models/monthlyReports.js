'use strict';
module.exports = function (sequelize, DataTypes) {
    var monthly_reports = sequelize.define('MONTHLY_REPORTS', {
        id: {
            type: DataTypes.INTEGER
            , primaryKey: true
            , autoIncrement: true
            ,allowNull: false
        }
        , uid: {
            type: DataTypes.INTEGER
            , allowNull: false
             , primaryKey: true
        }, 
        years: {
            type: DataTypes.CHAR(4)
            , allowNull: false
            , primaryKey: true
        }
        , categories: {
            type: DataTypes.STRING
            , allowNull: false
            , primaryKey: true
        }
        , Jan: {
            type: DataTypes.DECIMAL(5, 2)
            ,defaultValue: '0'
        }, Feb: {
            type: DataTypes.DECIMAL(5, 2)
            ,defaultValue: '0'
        }, Mar: {
            type: DataTypes.DECIMAL(5, 2)
            ,defaultValue: '0'
        }, Apr: {
            type: DataTypes.DECIMAL(5, 2)
            ,defaultValue: '0'
        }, May: {
            type: DataTypes.DECIMAL(5, 2)
            ,defaultValue: '0'
        }, Jun: {
            type: DataTypes.DECIMAL(5, 2)
            ,defaultValue: '0'
        }, Jul: {
            type: DataTypes.DECIMAL(5, 2)
            ,defaultValue: '0'
        }, Aug: {
            type: DataTypes.DECIMAL(5, 2)
            ,defaultValue: '0'
        }, Sept: {
            type: DataTypes.DECIMAL(5, 2)
            ,defaultValue: '0'
        }, Oct: {
            type: DataTypes.DECIMAL(5, 2)
            ,defaultValue: '0'
        }, Nov: {
            type: DataTypes.DECIMAL(5, 2)
            ,defaultValue: '0'
        }, Dec: {
            type: DataTypes.DECIMAL(5, 2)
        }, Totals: {
            type: DataTypes.DECIMAL(10, 2)
            ,defaultValue: '0'
        }
       
    }, {
        freezeTableName: true
        , tableName: 'monthlyReports'
        , timestamps: false
        , classMethods: {
            associate: function (models) {
                monthly_reports.belongsTo(models.USERS, {
                        foreignKey: 'uid'
                    })
            }
        }
        , instanceMethods: {
            /*bulkCreate: function (req, onSuccess, onError) {
                monthly_fees.bulkCreate(req, {
                    individualHooks: true
                }).then(onSuccess).error(onError);
            },*/
            create: function (req, onSuccess, onError) {
                monthly_reports.create(req, {
                }).then(onSuccess).error(onError);
            },
            update: function (req, onSuccess, onError) {
                monthly_reports.update({
                    where: {
                        id: req.param.id
                    }
                }).then(onSuccess).error(onError);
            },
            read : function(req, onSuccess, onError){
            
            monthly_reports.find({

                where: {
                        id: req.param.id
                    }

           },{ raw: true}).then(onSuccess).error(onError);
         },
            readAll : function(req, onSuccess, onError){
            
            monthly_reports.findAll({
              include: [
                        {  
                            model: sequelize.import('./users.js'),
                            attributes: ['firstName', 'lastName']
                   }],
                   where: {
                       $and: {
                          uid: req.body.id
                          ,categories: req.body.category  
                      }
                  }
             

           }).then(onSuccess).error(onError);
         },
            readAllUsers : function(req, onSuccess, onError){
            
            monthly_reports.findAll({
              include: [
                        {  
                            model: sequelize.import('./users.js'),
                            attributes: ['firstName', 'lastName']
                   }],
                   where: {
                       $and: {
                          years: req.body.year
                          ,categories: req.body.category  
                      }
                  }
             

           }).then(onSuccess).error(onError);
         }  
        }
    });
    return monthly_reports;
};