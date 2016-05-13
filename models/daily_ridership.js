'user strict';
/**
 * Defines a **DailyRidership** Sequelize model.
 * @module models/daily-ridership
 */

/**
 * A factory function that returns a Sequelize-defined **DailyRidership** model.
 *
 * @param {object} sequelize A sequelize instance.
 * @param {object} DataTypes Sequelize data types.
 * @returns {Sequelize.Model} The factory function returns a **DailyRidership** model.
 *  These are the model fields:
 *
 * | Field          | Type        |
 * |----------------|-------------|
 * |`id`            | INTEGER     |
 * |`createdOn`     | DATE        |
 * |`current`       | BOOLEAN     |
 * |`dayOfWeek`     | STRING      |
 * |`season`        | STRING      |
 * |`year`          | INTEGER     |
 * |`ridership`     | FLOAT       |
 * |`timestamp`     | DATE        |
 *
 */
module.exports = function(sequelize, DataTypes) {
  var DailyRidership = sequelize.define('DailyRidership', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    createdOn: { type: DataTypes.DATE },
    current: { type: DataTypes.BOOLEAN },
    dayOfWeek: { type: DataTypes.STRING },
    season: { type: DataTypes.STRING },
    year: { type: DataTypes.INTEGER },
    ridership: { type: DataTypes.FLOAT },
    timestamp: { type: DataTypes.DATE }
  }, {
    classMethods: {
      associate: function(models) {
        DailyRidership.belongsTo(models.Route, {
          onDelete: "CASCADE",
          foreignKey: "route_id",
        })
      }
    },
    timestamps: false,
    underscored: true,
    tableName: 'daily_ridership'
  });
  return DailyRidership;
};

