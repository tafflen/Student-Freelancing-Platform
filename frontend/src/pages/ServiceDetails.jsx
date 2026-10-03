import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceById, createRequest } from '../api';

const ServiceDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getServiceById(id);
        setService(data);
      } catch (err) {
        setError(err.message || 'Failed to load service details');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleSendRequest = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError('Please enter a message explaining your requirements.');
      return;
    }

    try {
      setSending(true);
      setError('');

      const freelancerId = service.freelancerId?._id || service.freelancerId;

      await createRequest({
        serviceId: service._id,
        clientId: user._id,
        freelancerId: freelancerId,
        message: message.trim()
      });

      navigate('/requests');
    } catch (err) {
      setError(err.message || 'Failed to send service request');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <p style={{ color: '#64748b', textAlign: 'center' }}>Loading service details...</p>;
  }

  if (!service) {
    return (
      <div className="empty-state">
        <h3>Service not found</h3>
        <p>The requested service does not exist or may have been removed.</p>
        <button className="btn-primary" onClick={() => navigate('/client')} style={{ marginTop: '16px' }}>
          Back to Browse Services
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto' }}>
      <button
        className="btn-secondary"
        onClick={() => navigate('/client')}
        style={{ marginBottom: '16px' }}
      >
        ← Back to Services
      </button>

      {error && <div className="alert alert-error">{error}</div>}

      {/* Service Details Card */}
      <div className="details-card">
        <span className="category-tag">{service.category}</span>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', margin: '8px 0' }}>
          {service.title}
        </h2>
        <div style={{ fontSize: '22px', fontWeight: '700', color: '#16a34a', marginBottom: '16px' }}>
          ₹{service.price}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '14px', color: '#475569', marginBottom: '6px' }}>Description</h4>
          <p style={{ color: '#334155', whiteSpace: 'pre-line', lineHeight: '1.6' }}>
            {service.description}
          </p>
        </div>

        {service.freelancerId && typeof service.freelancerId === 'object' && (
          <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '6px', fontSize: '13px', color: '#475569' }}>
            <strong>Offered by: </strong> {service.freelancerId.name} ({service.freelancerId.email})
          </div>
        )}
      </div>

      {/* Send Service Request Form */}
      <div className="white-card">
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
          Send Service Request
        </h3>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
          Describe what you need. The student freelancer will review and accept or reject your request.
        </p>

        <form onSubmit={handleSendRequest}>
          <div className="form-group">
            <label htmlFor="message">Your Requirements / Message</label>
            <textarea
              id="message"
              rows="4"
              placeholder="e.g. Hi! I need a modern logo for my startup in tech. Please let me know if you can deliver in 3 days."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setError('');
              }}
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={sending}>
            {sending ? 'Sending Request...' : 'Send Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceDetails;
