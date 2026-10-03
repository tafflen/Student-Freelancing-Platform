const API_URL = "http://localhost:5000/api";

// 1. Register a new user
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to register user");
  }
  return data;
};

// 2. Login user
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to log in");
  }
  return data;
};

// 3. Get all services
export const getServices = async () => {
  const response = await fetch(`${API_URL}/services`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch services");
  }
  return data;
};

// 4. Get service by ID
export const getServiceById = async (id) => {
  const response = await fetch(`${API_URL}/services/${id}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch service details");
  }
  return data;
};

// 5. Create a new service
export const createService = async (serviceData) => {
  const response = await fetch(`${API_URL}/services`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serviceData)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create service");
  }
  return data;
};

// 6. Update an existing service
export const updateService = async (id, serviceData) => {
  const response = await fetch(`${API_URL}/services/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serviceData)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update service");
  }
  return data;
};

// 7. Delete a service
export const deleteService = async (id) => {
  const response = await fetch(`${API_URL}/services/${id}`, {
    method: "DELETE"
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete service");
  }
  return data;
};

// 8. Create a service request
export const createRequest = async (requestData) => {
  const response = await fetch(`${API_URL}/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to send request");
  }
  return data;
};

// 9. Get all requests
export const getRequests = async () => {
  const response = await fetch(`${API_URL}/requests`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch requests");
  }
  return data;
};

// 10. Update request status (Accept / Reject)
export const updateRequestStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/requests/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update request status");
  }
  return data;
};
