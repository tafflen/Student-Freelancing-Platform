import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices, deleteService, getRequests, updateRequestStatus } from '../api';
import ServiceCard from '../components/ServiceCard';
import RequestCard from '../components/RequestCard';

const FreelancerDashboard = ({ user }) => {
  const [myServices, setMyServices] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [servicesData, requestsData] = await Promise.all([
        getServices(),
        getRequests()
      ]);

      // Filter services belonging to loggedInUser
      const filteredServices = servicesData.filter((service) => {
        const fId = service.freelancerId?._id || service.freelancerId;
        return fId === user._id;
      });
      setMyServices(filteredServices);

      // Filter requests belonging to this freelancer
      const filteredRequests = requestsData.filter((request) => {
        const fId = request.freelancerId?._id || request.freelancerId;
        return fId === user._id;
      });
      setMyRequests(filteredRequests);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user._id]);

  const handleDeleteService = async (serviceId) => {
    try {
      await deleteService(serviceId);
      setSuccessMessage('Service deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
      loadData();
    } catch (err) {
      setError(err.message || 'Failed to delete service');
    }
  };

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await updateRequestStatus(requestId, newStatus);
      setSuccessMessage(`Request ${newStatus.toLowerCase()} successfully`);
      setTimeout(() => setSuccessMessage(''), 3000);
      loadData();
    } catch (err) {
      setError(err.message || 'Failed to update request');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Welcome, {user.name}</h2>
          <p className="page-subtitle">Manage your freelance services and client requests</p>
        </div>
        <Link to="/add-service">
          <button className="btn-primary" style={{ width: 'auto' }}>
            + Add New Service
          </button>
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {/* Services Section */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
          My Services ({myServices.length})
        </h3>

        {loading ? (
          <p style={{ color: '#64748b' }}>Loading services...</p>
        ) : myServices.length === 0 ? (
          <div className="empty-state">
            <h3>No services posted yet</h3>
            <p>You haven't listed any freelance services yet. Click "+ Add New Service" to get started!</p>
          </div>
        ) : (
          <div className="card-grid">
            {myServices.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
                isFreelancer={true}
                onDelete={handleDeleteService}
              />
            ))}
          </div>
        )}
      </div>

      {/* Requests Received Section */}
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>
          Requests Received ({myRequests.length})
        </h3>

        {loading ? (
          <p style={{ color: '#64748b' }}>Loading requests...</p>
        ) : myRequests.length === 0 ? (
          <div className="empty-state">
            <h3>No requests received</h3>
            <p>You don't have any client requests yet. Once clients request your services, they will appear here.</p>
          </div>
        ) : (
          <div>
            {myRequests.map((request) => (
              <RequestCard
                key={request._id}
                request={request}
                isFreelancer={true}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerDashboard;
