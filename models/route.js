'use strict';
/**
 * Defines a **Route** Sequelize model.
 *
 * @module models/route
 */

/**
 * A factory function that returns a Sequelize-defined **Route** model.
 *
 * @param {object} sequelize A sequelize instance.
 * @param {object} DataTypes Sequelize data types.
 * @returns {Sequelize.Model} The factory function returns a **Route** model.
 *  These are the model fields:
 *
 * | Field          | Type        |
 * |----------------|-------------|
 * |`id`            | INTEGER     |
 * |`routeNumber`   | INTEGER     |
 * |`routeName`     | STRING      |
 * |`serviceType`   | STRING      |
 */
module.exports = function(sequelize, DataTypes) {
  var Route = sequelize.define('Route', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    routeNumber: { type: DataTypes.INTEGER, field: 'route_number' } ,
    routeName: { type: DataTypes.STRING, field: 'route_name' },
    serviceType: { type: DataTypes.STRING, field: 'service_type' },
    isHighRidership: { type: DataTypes.BOOLEAN, field: 'is_high_ridership'}
  }, {
    classMethods: {
      associate: function(models) {
        Route.hasMany(models.DailyRidership, { foreignKey: 'route_id'});
        Route.hasMany(models.ServiceHourRidership, { foreignKey: 'route_id'});
      }
    },
    timestamps: false,
    underscored: true,
    tableName: 'route'
  });
  return Route;
};
