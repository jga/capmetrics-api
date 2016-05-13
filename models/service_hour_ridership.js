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
  var ServiceHourRidership = sequelize.define('ServiceHourRidership', {
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

