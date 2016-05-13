'use strict';
/**
 * Defines an **ETLReport** Sequelize model.
 *
 * @module models/etl-report
 */

/**
 * A factory function that returns a Sequelize-defined **ETLReport** model.
 *
 * @param {object} sequelize A sequelize instance.
 * @param {object} DataTypes Sequelize data types.
 * @returns {Sequelize.Model} The factory function returns a **ETLReport** model.
 *  These are the model fields:
 *
 * | Field          | Type        |
 * |----------------|-------------|
 * |`id`            | INTEGER     |
 * |`creates`       | INTEGER     |
 * |`etlType`       | STRING      |
 * |`timestamp`     | DATE        |
 * |`totalModels`   | INTEGER     |
 * |`updates`       | INTEGER     |
 */
module.exports = function(sequelize, DataTypes) {
  var ETLReport = sequelize.define('ETLReport', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    creates: { type: DataTypes.INTEGER },
    etlType: { type: DataTypes.STRING },
    timestamp: { type: DataTypes.DATE },
    totalModels: { type: DataTypes.INTEGER },
    updates: { type: DataTypes.INTEGER },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'etl_report'
  });
  return ETLReport;
};
