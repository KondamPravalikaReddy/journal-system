const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SubmissionFile = sequelize.define('SubmissionFile', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  originalFilename: DataTypes.STRING(255),
  fileType: {
    type: DataTypes.ENUM('manuscript', 'supporting_material', 'source_code'),
    defaultValue: 'manuscript'
  },
  mimeType: DataTypes.STRING(100),
  fileSize: DataTypes.BIGINT,
  storageKey: DataTypes.STRING(500),
  storageType: {
    type: DataTypes.ENUM('local', 'minio'),
    defaultValue: 'local'
  },
  uploadStatus: {
    type: DataTypes.ENUM('uploading', 'uploaded', 'processing', 'processed', 'failed', 'deleted'),
    defaultValue: 'uploading'
  },
  md5Hash: DataTypes.STRING(32),
  sha256Hash: DataTypes.STRING(64),
  versionNumber: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  isCurrentVersion: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  uploadDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  processedDate: DataTypes.DATE,
  deletedAt: DataTypes.DATE
}, {
  tableName: 'submission_files',
  timestamps: true
});

module.exports = SubmissionFile;
