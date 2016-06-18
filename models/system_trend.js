'use strict';
/**
 * Defines a **SystemTrend** Sequelize model.
 *
 * @module models/system-trend
 */

/**
 * A factory function that returns a Sequelize-defined **SystemTrend** model.
 *
 * @param {object} sequelize A sequelize instance.
 * @param {object} DataTypes Sequelize data types.
 * @returns {Sequelize.Model} The factory function returns a **SystemTrend** model.
 *
 *  These are the model fields:
 *
 * | Field            | Type        |
 * |------------------|-------------|
 * |`id`              | INTEGER     |
 * |`updatedOn`       | DATE        |
 * |`trend`           | STRING      |
 * |`serviceType`     | STRING      |
 */
module.exports = function(sequelize, DataTypes) {
  var SystemTrend = sequelize.define('SystemTrend', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    updatedOn: { type: DataTypes.DATE, field: 'updated_on' },
    trend: {
      type: DataTypes.STRING, field: 'trend',
      //get: function() {
        //let data = this.getDataValue('trend');
        ////let data = JSON.parse(this.getDataValue('trend'));
        ////console.log('PARSING: ' + data);
      //},
      //set: function(value) {
        //return this.setDataValue('trend', value);
      //}
    },
    serviceType: { type: DataTypes.STRING },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'system_trend'
  });
  return SystemTrend;
};
