const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  assignedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  dueDate: DataTypes.DATE,
  status: {
    type: DataTypes.ENUM('assigned', 'accepted', 'declined', 'submitted', 'late'),
    defaultValue: 'assigned'
  },
  recommendation: DataTypes.ENUM('accept', 'minor_revisions', 'major_revisions', 'reject'),
  reviewText: DataTypes.TEXT,
  submittedDate: DataTypes.DATE
}, {
  tableName: 'reviews',
  timestamps: true
});

module.exports = Review;
