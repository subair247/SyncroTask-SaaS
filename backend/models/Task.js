const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // We use a Boolean because the Dashboard UI checks for true/false
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    // CRITICAL: This is the missing link to your User
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Task;