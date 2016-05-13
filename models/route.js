'use strict';
/**
 * Route model.
 *
 * @module models/route
 * @memberof models
 */

module.exports = function(sequelize, DataTypes) {
  /** Defines `Route` model for Sequelize. **/
  var Route = sequelize.define('Route', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    performance: {type: DataTypes.INTEGER},
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'daily_ridership'
  });
  return Route;
};
