"use strict";
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define(
    "Person",
    {
      identificationNumber: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true
      }
    },
    { sequelize }
  );
  Person.associate = function(models) {
    Person.belongsToMany(models.Research, {
      through: models.ResearchPerson,
      foreignKey: "identificationNumber",
      as: "People"
    });
  };
  return Person;
};
