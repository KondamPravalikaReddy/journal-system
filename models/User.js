const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  },
  passwordHash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  firstName: DataTypes.STRING(100),
  lastName: DataTypes.STRING(100),
  institution: DataTypes.STRING(255),
  role: {
    type: DataTypes.ENUM('author', 'editor', 'reviewer', 'admin'),
    defaultValue: 'author'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  emailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'users',
  timestamps: true
});

// Hash password before creating user
User.beforeCreate(async (user) => {
  if (user.passwordHash) {
    user.passwordHash = await bcrypt.hash(user.passwordHash, 10);
  }
});

// Verify password method
User.prototype.verifyPassword = async function(plainPassword) {
  return bcrypt.compare(plainPassword, this.passwordHash);
};

// Hide sensitive data when converting to JSON
User.prototype.toJSON = function() {
  const { passwordHash, ...data } = this.dataValues;
  return data;
};

module.exports = User;
