'use strict';
/**
 * Defines a **PerformanceDocument** Sequelize model.
 *
 * @module models/performance-document
 */

/**
 * A factory function that returns a Sequelize-defined **PerformanceDocument** model.
 *
 * @param {object} sequelize A sequelize instance.
 * @param {object} DataTypes Sequelize data types.
 * @returns {Sequelize.Model} The factory function returns a **PerformanceDocument** model.
 *
 *  These are the model fields:
 *
 * | Field            | Type        |
 * |------------------|-------------|
 * |`id`              | INTEGER     |
 * |`document`        | STRING      |
 * |`name`            | STRING      |
 * |`updatedOn`       | DATE        |
 */
module.exports = function(sequelize, DataTypes) {
  var PerformanceDocument = sequelize.define('PerformanceDocument', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    document: { type: DataTypes.STRING, field: 'document' },
    name: { type: DataTypes.STRING, field: 'name' },
    updatedOn: { type: DataTypes.DATE, field: 'updated_on' },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'performance_document'
  });
  return PerformanceDocument;
};
