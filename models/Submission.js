const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Submission = sequelize.define('Submission', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  abstract: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  keywords: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  status: {
    type: DataTypes.ENUM(
      'draft',
      'submitted',
      'under_review',
      'revision_requested',
      'accepted',
      'rejected',
      'published',
      'withdrawn'
    ),
    defaultValue: 'draft'
  },
  submissionDate: DataTypes.DATE,
  wordCount: DataTypes.INTEGER,
  referencesCount: DataTypes.INTEGER
}, {
  tableName: 'submissions',
  timestamps: true
});

// Check if author can edit submission
Submission.prototype.canAuthorEdit = function() {
  return ['draft', 'revision_requested'].includes(this.status);
};

module.exports = Submission;
