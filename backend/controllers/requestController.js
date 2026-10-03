const Request = require('../models/Request');

// POST /api/requests
// Create a new request (Client requests a service)
const createRequest = async (req, res) => {
  try {
    const { serviceId, clientId, freelancerId, message } = req.body;

    if (!serviceId || !clientId || !freelancerId || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const request = await Request.create({
      serviceId,
      clientId,
      freelancerId,
      message,
      status: 'Pending'
    });

    const populatedRequest = await Request.findById(request._id)
      .populate('serviceId', 'title description category price')
      .populate('clientId', 'name email')
      .populate('freelancerId', 'name email');

    res.status(201).json(populatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error creating request' });
  }
};

// GET /api/requests
// Get all requests
const getRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate('serviceId', 'title description category price')
      .populate('clientId', 'name email')
      .populate('freelancerId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error fetching requests' });
  }
};

// PUT /api/requests/:id
// Update request status (Accept or Reject)
const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !['Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Status must be Accepted or Rejected' });
    }

    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate('serviceId', 'title description category price')
      .populate('clientId', 'name email')
      .populate('freelancerId', 'name email');

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error updating request' });
  }
};

module.exports = {
  createRequest,
  getRequests,
  updateRequestStatus
};
