"use strict";
module.exports = (sequelize, DataTypes) => {
  const ResearchPerson = sequelize.define(
    "ResearchPerson",
    {
      researchID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Research",
          key: "researchID"
        }
      },
      identificationNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Person",
          key: "identificationNumber"
        }
      },
      identificationHash: DataTypes.STRING
    },
    {}
  );
  ResearchPerson.associate = function(models) {
    // associations can be defined here
  };
  return ResearchPerson;
};
