import React, { useState, useEffect } from 'react';
import { getRequests, updateRequestStatus } from '../api';
import RequestCard from '../components/RequestCard';

const MyRequests = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const isFreelancer = user?.role === 'freelancer';

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError('');
      const allRequests = await getRequests();

      // Filter based on role
      const filtered = allRequests.filter((req) => {
        if (isFreelancer) {
          const fId = req.freelancerId?._id || req.freelancerId;
          return fId === user._id;
        } else {
          const cId = req.clientId?._id || req.clientId;
          return cId === user._id;
        }
      });

      setRequests(filtered);
    } catch (err) {
      setError(err.message || 'Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user._id]);

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await updateRequestStatus(requestId, newStatus);
      setSuccessMessage(`Request ${newStatus.toLowerCase()} successfully`);
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchRequests();
    } catch (err) {
      setError(err.message || 'Failed to update request');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">
            {isFreelancer ? 'Service Requests Received' : 'My Service Requests'}
          </h2>
          <p className="page-subtitle">
            {isFreelancer
              ? 'Review, accept, or reject client requests for your services'
              : 'Track the status of services you requested from student freelancers'}
          </p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {loading ? (
        <p style={{ color: '#64748b' }}>Loading requests...</p>
      ) : requests.length === 0 ? (
        <div className="empty-state">
          <h3>No requests found</h3>
          <p>
            {isFreelancer
              ? 'You have not received any requests from clients yet.'
              : 'You have not submitted any service requests yet.'}
          </p>
        </div>
      ) : (
        <div>
          {requests.map((request) => (
            <RequestCard
              key={request._id}
              request={request}
              isFreelancer={isFreelancer}
              onStatusUpdate={handleStatusUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
