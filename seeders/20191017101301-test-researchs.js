"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Research",
      [
        {
          researchID: "3d8b72aa-cbfa-4022-9e64-f6c79b9823bf",
          name: "Tutkimus 1",
          permission: "Lupa 1",
          archiveID: "Arkistointitunnus 1",
          researchManager: "Tutkimuksen yhteyshenkilö 1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          researchID: "2fb60378-b8ee-451a-8a16-6fa81d6d432e",
          name: "Tutkimus 2",
          permission: "Lupa 2",
          archiveID: "Arkistointitunnus 2",
          researchManager: "Tutkimuksen yhteyshenkilö 2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          researchID: "423138d0-2d0f-4c05-a398-e2c637ed090f",
          name: "Tutkimus 3",
          permission: "Lupa 3",
          archiveID: "Arkistointitunnus 3",
          researchManager: "Tutkimuksen yhteyshenkilö 3",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Research", null, {});
  }
};
