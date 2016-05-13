'user strict';

/**
 * Daily ridership model.
 * @module models/daily-ridership
 */

module.exports = function(sequelize, DataTypes) {
  var DailyRidership = sequelize.define('DailyRidership', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    performance: {type: DataTypes.INTEGER},
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'daily_ridership'
  });
  return DailyRidership;
};

