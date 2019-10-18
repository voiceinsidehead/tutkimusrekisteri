"use strict";
module.exports = (sequelize, DataTypes) => {
  const Research = sequelize.define(
    "Research",
    {
      researchID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: DataTypes.STRING,
      permission: DataTypes.STRING,
      archiveID: {
        type: DataTypes.STRING
      },
      researchManager: DataTypes.STRING
    },
    { sequelize }
  );
  Research.associate = function(models) {
    Research.belongsToMany(models.Person, {
      through: models.ResearchPerson,
      foreignKey: "researchID"
    });
  };
  return Research;
};
