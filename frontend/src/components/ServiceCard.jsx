import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ service, isFreelancer, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      onDelete(service._id);
    }
  };

  return (
    <div className="service-card">
      <div className="service-card-header">
        <span className="category-tag">{service.category}</span>
        <h3 className="service-title">{service.title}</h3>
        <p className="service-desc">{service.description}</p>
      </div>

      <div className="service-meta">
        <span className="service-price">₹{service.price}</span>

        <div className="service-actions">
          {isFreelancer ? (
            <>
              <button
                className="btn-secondary"
                onClick={() => navigate(`/edit-service/${service._id}`)}
              >
                Edit
              </button>
              <button
                className="btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          ) : (
            <button
              className="btn-primary"
              onClick={() => navigate(`/service/${service._id}`)}
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
