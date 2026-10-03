const express = require('express');
const router = express.Router();
const {
  createRequest,
  getRequests,
  updateRequestStatus
} = require('../controllers/requestController');

// Request routes
router.post('/', createRequest);
router.get('/', getRequests);
router.put('/:id', updateRequestStatus);

module.exports = router;
