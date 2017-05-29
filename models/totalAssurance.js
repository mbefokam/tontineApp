'use strict';
module.exports = function (sequelize, DataTypes) {
    var totalAssurances = sequelize.define('TOTALASSURANCE', {
        id: {
            type: DataTypes.INTEGER
            , primaryKey: true
            , autoIncrement: true
            ,allowNull: false
        }
        , assurance: {
            type: DataTypes.DECIMAL(30, 2)
            ,defaultValue: '0'
        }

    }, {
        freezeTableName: true
        , tableName: 'totalAssurance'
        , timestamps: false
        , classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
        , instanceMethods: {
            create: function (req, onSuccess, onError) {
            totalAssurances.create(req, {}).then(onSuccess).error(onError);
            },
            update: function (req, onSuccess, onError) {
            totalAssurances.update(req,{
                    where: {
                        id: req.id
                    }
                }).then(onSuccess).error(onError);
            },
            read : function(onSuccess, onError){
            totalAssurances.find({
              limit: 1,
              order: [['id','DESC']]
           }).then(onSuccess).error(onError);
         }
        }
    });
    return totalAssurances;
};
