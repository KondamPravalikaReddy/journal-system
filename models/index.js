const User = require('./User');
const Submission = require('./Submission');
const SubmissionFile = require('./SubmissionFile');
const Review = require('./Review');

// ============================================
// Model Associations
// ============================================

// User → Submissions (One-to-Many)
User.hasMany(Submission, { foreignKey: 'authorId' });
Submission.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

// Submission → SubmissionFiles (One-to-Many)
Submission.hasMany(SubmissionFile, { foreignKey: 'submissionId' });
SubmissionFile.belongsTo(Submission, { foreignKey: 'submissionId' });

// Submission → Reviews (One-to-Many)
Submission.hasMany(Review, { foreignKey: 'submissionId' });
Review.belongsTo(Submission, { foreignKey: 'submissionId' });

// User → Reviews (One-to-Many) as reviewer
User.hasMany(Review, { foreignKey: 'reviewerId' });
Review.belongsTo(User, { foreignKey: 'reviewerId', as: 'reviewer' });

module.exports = {
  User,
  Submission,
  SubmissionFile,
  Review
};
