'use strict';
/**
 * @module models/system-trend
 */

var defineModel = function(sequelize, DataTypes) {
  var SystemTrend = sequelize.define('SystemTrend', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    updatedOn: { type: DataTypes.DATE, field: 'updated_on' },
    trend: {
      type: DataTypes.STRING, field: 'trend'
    },
    serviceType: { type: DataTypes.STRING, field: 'service_type' },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'system_trend'
  });
  return SystemTrend;
};
/**
 * A factory function that returns a Sequelize-defined **SystemTrend** model.
 *
 *  These are the model fields:
 *
 * | Field            | Type        |
 * |------------------|-------------|
 * |`id`              | INTEGER     |
 * |`updatedOn`       | DATE        |
 * |`trend`           | STRING      |
 * |`serviceType`     | STRING      |
 *
 * @param {object} sequelize A sequelize instance.
 * @param {object} DataTypes Sequelize data types.
 * @returns {Sequelize.Model} The factory function returns a **SystemTrend** model.
 */
module.exports = defineModel;

