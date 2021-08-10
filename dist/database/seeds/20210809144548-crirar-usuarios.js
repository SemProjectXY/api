"use strict";module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    nome: 'John Doee',
    email: 'asd@das.asddas',
    password_hash: 'adsasd',
    created_at: new Date(),
    updated_at: new Date(),
  }], {}),

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
