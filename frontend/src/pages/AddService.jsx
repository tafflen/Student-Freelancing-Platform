import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createService } from '../api';

const AddService = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category || !formData.price) {
      setError('Please fill in all fields');
      return;
    }

    if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      setError('Price must be a valid positive number');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await createService({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        freelancerId: user._id
      });

      navigate('/freelancer');
    } catch (err) {
      setError(err.message || 'Failed to create service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container-card">
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <div>
          <h2 className="page-title">Add New Service</h2>
          <p className="page-subtitle">List your skills and offer services to clients</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Service Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g. Logo Design, Website Development"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="e.g. Graphic Design, Web Development, Content Writing"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (₹)</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="e.g. 500"
            min="1"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            placeholder="Provide a detailed description of what you offer in this service..."
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Adding Service...' : 'Add Service'}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/freelancer')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddService;
