const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { Review, Submission } = require('../models');

const router = express.Router();

/**
 * POST /api/reviews
 * Create review assignment
 */
router.post('/', authenticate, authorize(['editor', 'admin']), async (req, res) => {
  try {
    const { submissionId, reviewerId, dueDate } = req.body;

    const submission = await Submission.findByPk(submissionId);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    const review = await Review.create({
      submissionId,
      reviewerId,
      dueDate: new Date(dueDate),
      status: 'assigned'
    });

    res.status(201).json(review);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/reviews/:reviewId/submit
 * Submit review
 */
router.post('/:reviewId/submit', authenticate, async (req, res) => {
  try {
    const { recommendation, reviewText } = req.body;

    const review = await Review.findByPk(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.reviewerId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    review.status = 'submitted';
    review.recommendation = recommendation;
    review.reviewText = reviewText;
    review.submittedDate = new Date();
    await review.save();

    res.json(review);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/reviews/:reviewId
 * Get review details
 */
router.get('/:reviewId', authenticate, async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.reviewId, {
      include: ['submission', { association: 'reviewer', attributes: ['id', 'email', 'firstName', 'lastName'] }]
    });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json(review);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
