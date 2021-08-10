module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.changeColumn('alunos', 'email', {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  }),

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
