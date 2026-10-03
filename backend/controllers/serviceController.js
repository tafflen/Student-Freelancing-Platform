const Service = require('../models/Service');

// POST /api/services
// Create a new service
const createService = async (req, res) => {
  try {
    const { title, description, category, price, freelancerId } = req.body;

    if (!title || !description || !category || price === undefined || !freelancerId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const service = await Service.create({
      title,
      description,
      category,
      price: Number(price),
      freelancerId
    });

    const populatedService = await Service.findById(service._id).populate('freelancerId', 'name email role');

    res.status(201).json(populatedService);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error creating service' });
  }
};

// GET /api/services
// Get all services
const getServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate('freelancerId', 'name email role')
      .sort({ createdAt: -1 });

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error fetching services' });
  }
};

// GET /api/services/:id
// Get a single service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('freelancerId', 'name email role');

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error fetching service' });
  }
};

// PUT /api/services/:id
// Update service by ID
const updateService = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      {
        ...(title && { title }),
        ...(description && { description }),
        ...(category && { category }),
        ...(price !== undefined && { price: Number(price) })
      },
      { new: true, runValidators: true }
    ).populate('freelancerId', 'name email role');

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error updating service' });
  }
};

// DELETE /api/services/:id
// Delete service by ID
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error deleting service' });
  }
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService
};
