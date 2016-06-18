'user strict';
/**
 * Defines a **ServiceHourRidership** Sequelize model.
 * @module models/service-hour-ridership
 */

/**
 * A factory function that returns a Sequelize-defined **ServiceHourRidership** model.
 *
 * @param {object} sequelize A sequelize instance.
 * @param {object} DataTypes Sequelize data types.
 * @returns {Sequelize.Model} The factory function returns a **ServiceHourRidership** model.
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
 * |`seasonTimestamp` | DATE        |
 *
 */
module.exports = function(sequelize, DataTypes) {
  var ServiceHourRidership = sequelize.define('ServiceHourRidership', {
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
        ServiceHourRidership.belongsTo(models.Route, {
          onDelete: "CASCADE",
          foreignKey: "route_id"
        })
      }
    },
    timestamps: false,
    underscored: true,
    tableName: 'service_hour_ridership'
  });
  return ServiceHourRidership;
};

