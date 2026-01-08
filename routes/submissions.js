const express = require('express');
const multer = require('multer');
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { authenticate } = require('../middleware/auth');
const { Submission, SubmissionFile } = require('../models');

const router = express.Router();

/**
 * Configure multer for file uploads
 */
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dir = `./uploads/temp/${req.params.submissionId || 'temp'}`;
    await fs.mkdir(dir, { recursive: true }).catch(() => {});
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'image/jpeg',
      'image/png'
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type not allowed: ${file.mimetype}`));
    }
  }
});

/**
 * POST /api/submissions
 * Create new submission
 */
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, abstract, keywords, journalId } = req.body;

    const submission = await Submission.create({
      title,
      abstract,
      keywords: keywords || [],
      authorId: req.user.id,
      journalId: journalId || null,
      status: 'draft'
    });

    res.status(201).json(submission);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/submissions/:submissionId
 * Get submission details
 */
router.get('/:submissionId', authenticate, async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.submissionId, {
      include: ['author', { model: SubmissionFile }]
    });

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json(submission);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/submissions/:submissionId/files
 * Upload file to submission
 */
router.post('/:submissionId/files', authenticate, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const submission = await Submission.findByPk(req.params.submissionId);
    if (!submission) {
      await fs.unlink(req.file.path).catch(() => {});
      return res.status(404).json({ error: 'Submission not found' });
    }

    if (submission.authorId !== req.user.id) {
      await fs.unlink(req.file.path).catch(() => {});
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Calculate file checksums
    const fileBuffer = await fs.readFile(req.file.path);
    const md5 = crypto.createHash('md5').update(fileBuffer).digest('hex');
    const sha256 = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    // Mark previous version as not current
    await SubmissionFile.update(
      { isCurrentVersion: false },
      { where: { submissionId: req.params.submissionId, fileType: 'manuscript' } }
    );

    // Move file to final location
    const finalDir = `./uploads/files/${req.params.submissionId}`;
    await fs.mkdir(finalDir, { recursive: true });
    const finalPath = path.join(finalDir, `${Date.now()}-${req.file.originalname}`);
    await fs.rename(req.file.path, finalPath);

    // Create file record in database
    const fileRecord = await SubmissionFile.create({
      submissionId: req.params.submissionId,
      originalFilename: req.file.originalname,
      fileType: req.body.fileType || 'manuscript',
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
      storageKey: finalPath,
      storageType: 'local',
      md5Hash: md5,
      sha256Hash: sha256,
      uploadStatus: 'processed',
      uploadDate: new Date()
    });

    res.status(201).json(fileRecord);

  } catch (err) {
    if (req.file) {
      await fs.unlink(req.file.path).catch(() => {});
    }
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/submissions/:submissionId/files
 * List all files for submission
 */
router.get('/:submissionId/files', authenticate, async (req, res) => {
  try {
    const files = await SubmissionFile.findAll({
      where: { submissionId: req.params.submissionId },
      attributes: ['id', 'originalFilename', 'fileType', 'fileSize', 'uploadStatus', 'uploadDate'],
      order: [['uploadDate', 'DESC']]
    });

    res.json(files);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
