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
 * | Field            | Type        |
 * |------------------|-------------|
 * |`id`              | INTEGER     |
 * |`createdOn`       | DATE        |
 * |`isCurrent`       | BOOLEAN     |
 * |`dayOfWeek`       | STRING      |
 * |`season`          | STRING      |
 * |`calendarYear`    | INTEGER     |
 * |`ridership`       | FLOAT       |
 * |`measurementTimestamp` | DATE        |
 *
 */
module.exports = function(sequelize, DataTypes) {
  var DailyRidership = sequelize.define('DailyRidership', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    createdOn: { type: DataTypes.DATE, field: 'created_on' },
    isCurrent: { type: DataTypes.BOOLEAN, field: 'is_current' },
    dayOfWeek: { type: DataTypes.STRING, field: 'day_of_week' },
    season: { type: DataTypes.STRING },
    calendarYear: { type: DataTypes.INTEGER, field: 'calendar_year' },
    ridership: { type: DataTypes.FLOAT },
    measurementTimestamp: { type: DataTypes.DATE, field: 'measurement_timestamp' }
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

