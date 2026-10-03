import React, { useState, useEffect } from 'react';
import { getServices } from '../api';
import ServiceCard from '../components/ServiceCard';

const ClientDashboard = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getServices();
        setServices(data);
      } catch (err) {
        setError(err.message || 'Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Extract unique categories from loaded services
  const categories = ['All', ...new Set(services.map((s) => s.category).filter(Boolean))];

  // Frontend search and category filtering
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || service.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Browse Services</h2>
          <p className="page-subtitle">Find affordable freelance services offered by talented student freelancers</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {/* Search and Category Filter */}
      <div className="search-filter-bar">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search services by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-select-wrapper">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                Category: {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Services List */}
      {loading ? (
        <p style={{ color: '#64748b' }}>Loading services from students...</p>
      ) : filteredServices.length === 0 ? (
        <div className="empty-state">
          <h3>No services found</h3>
          <p>
            {searchTerm || selectedCategory !== 'All'
              ? 'Try adjusting your search or category filter to find what you are looking for.'
              : 'No student freelancers have listed any services yet.'}
          </p>
        </div>
      ) : (
        <div className="card-grid">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
              isFreelancer={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
