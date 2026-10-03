import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getServiceById, updateService } from '../api';

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError('');
        const service = await getServiceById(id);
        setFormData({
          title: service.title || '',
          description: service.description || '',
          category: service.category || '',
          price: service.price !== undefined ? service.price.toString() : ''
        });
      } catch (err) {
        setError(err.message || 'Failed to load service details');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

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
      setSaving(true);
      setError('');
      await updateService(id, {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price)
      });

      navigate('/freelancer');
    } catch (err) {
      setError(err.message || 'Failed to update service');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p style={{ color: '#64748b', textAlign: 'center' }}>Loading service data...</p>;
  }

  return (
    <div className="form-container-card">
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <div>
          <h2 className="page-title">Edit Service</h2>
          <p className="page-subtitle">Update your service details</p>
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
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Saving Changes...' : 'Save Changes'}
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

export default EditService;
