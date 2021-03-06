const Sequelize = require('sequelize')
const sequelize = require('../assets/utils/database')

module.exports = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  biography: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  logo: {
    type: Sequelize.STRING,
    defaultValue: '/images/users/default.png'
  },
  isConfirmed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isPublicEmail: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  tempToken: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  tempExpirationToken: {
    type: Sequelize.DATE,
    allowNull: true
  }
})
