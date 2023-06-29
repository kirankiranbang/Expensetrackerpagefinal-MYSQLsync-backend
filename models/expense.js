const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Expense = sequelize.define('expenses', {
  // Define the model attributes here
  expenseamount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Enable timestamps
});

module.exports = Expense;
