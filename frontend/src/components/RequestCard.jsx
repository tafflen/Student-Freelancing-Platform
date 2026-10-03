import React from 'react';

const RequestCard = ({ request, isFreelancer, onStatusUpdate }) => {
  const serviceTitle = request.serviceId?.title || 'Service Title';
  const servicePrice = request.serviceId?.price;
  const clientName = request.clientId?.name || 'Client';
  const freelancerName = request.freelancerId?.name || 'Freelancer';

  return (
    <div className="request-card">
      <div className="request-header">
        <div>
          <h4 className="request-title">{serviceTitle}</h4>
          {servicePrice !== undefined && (
            <span style={{ fontSize: '13px', color: '#16a34a', fontWeight: '600' }}>
              ₹{servicePrice}
            </span>
          )}
        </div>
        <span className={`status-badge ${request.status}`}>
          {request.status}
        </span>
      </div>

      <div className="request-message">
        <strong>Message: </strong>
        {request.message}
      </div>

      <div className="request-footer">
        <div>
          {isFreelancer ? (
            <span>Requested by: <strong>{clientName}</strong></span>
          ) : (
            <span>Freelancer: <strong>{freelancerName}</strong></span>
          )}
        </div>

        {isFreelancer && request.status === 'Pending' && (
          <div className="request-actions">
            <button
              className="btn-success"
              onClick={() => onStatusUpdate(request._id, 'Accepted')}
            >
              Accept
            </button>
            <button
              className="btn-danger"
              onClick={() => onStatusUpdate(request._id, 'Rejected')}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
