# STUDENT FREELANCING PLATFORM

A beginner-friendly, full-stack MERN (MongoDB, Express.js, React, Node.js) web application developed for college laboratory practicals and academic mini-projects.

---

## 1. PROJECT OBJECTIVE

The **Student Freelancing Platform** bridges the gap between talented college students offering freelance services and clients (early-stage startups, small businesses, student clubs, and individuals) looking for quality, cost-effective digital work.

Students can monetize skills such as Graphic Design, Web Development, Content Writing, and Video Editing. Clients can browse student-listed services, filter by category or keywords, inspect details, and submit service requests. Freelancers can manage their service offerings and directly Accept or Reject incoming requests.

---

## 2. KEY FEATURES

- **Dual-Role Authentication:** Simple educational login and registration with explicit role selection (`Client` or `Freelancer`).
- **Session Persistence:** Persistent login state using browser `localStorage`.
- **Role-Based Navigation & Route Protection:** Tailored views and dashboards for Freelancers and Clients.
- **Service Management (CRUD):** Freelancers can Create, Read, Update, and Delete their service listings.
- **Service Discovery:** Clients can search services by title/description and filter by category dynamically.
- **Service Request Workflow:** Clients can send requests with custom project specifications.
- **Request Lifecycle Management:** Freelancers can Accept or Reject pending requests with real-time status updates.
- **Direct Database Integration:** All data is persisted directly into local MongoDB collections (`users`, `services`, `requests`) via Mongoose.
- **No Mock / Fake Data:** 100% of application state is fetched and manipulated through standard REST APIs.

---

## 3. USER ROLES

| Role | Permissions & Capabilities |
| :--- | :--- |
| **Freelancer** | • Create new service offerings with price, category, and description.<br>• View, edit, and delete their own services.<br>• View all incoming client requests.<br>• Accept or Reject requests with "Pending" status. |
| **Client** | • Browse all student freelance listings.<br>• Search and filter services by keyword and category.<br>• View complete service and freelancer details.<br>• Send service requests with specific project requirements.<br>• Track request status ("Pending", "Accepted", "Rejected"). |

---

## 4. TECHNOLOGY STACK

### Frontend
- **React 19** (Component-driven UI library)
- **Vite** (Next-generation lightning-fast frontend tooling)
- **React Router DOM v7** (Declarative client-side routing)
- **Vanilla CSS** (Clean, responsive layout with white cards, light-grey background, and dark navbar)
- **Fetch API** (Native browser HTTP request mechanism)

### Backend
- **Node.js** (JavaScript runtime environment)
- **Express.js** (Lightweight web server framework for RESTful APIs)
- **CORS** (Cross-Origin Resource Sharing middleware)
- **Dotenv** (Environment variable configuration)

### Database
- **MongoDB Community Server** (Local NoSQL document database on port `27017`)
- **Mongoose v8** (Object Data Modeling library for Node.js)
- **MongoDB Compass** (GUI for visual inspection of database collections and records)

### Development & Testing
- **VS Code / Google Antigravity** (IDE)
- **Postman / cURL** (API testing)

---

## 5. FOLDER STRUCTURE

```
student-freelancing-platform/
│
├── backend/
│   ├── controllers/
│   │   ├── userController.js      # User registration & login logic
│   │   ├── serviceController.js   # Service CRUD logic
│   │   └── requestController.js   # Request creation & status update logic
│   ├── models/
│   │   ├── User.js                # Mongoose schema for User
│   │   ├── Service.js             # Mongoose schema for Service
│   │   └── Request.js             # Mongoose schema for Request
│   ├── routes/
│   │   ├── userRoutes.js          # /api/users endpoints
│   │   ├── serviceRoutes.js       # /api/services endpoints
│   │   └── requestRoutes.js       # /api/requests endpoints
│   ├── middleware/
│   │   └── middleware.js          # Request logger and error handler
│   ├── .env                       # Environment variables (PORT, MONGO_URI)
│   ├── .gitignore                 # Backend gitignore (node_modules, .env)
│   ├── server.js                  # Express application entry point
│   ├── package.json               # Backend dependencies & scripts
│   └── package-lock.json
│
├── frontend/
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Role-aware responsive navigation bar
│   │   │   ├── ServiceCard.jsx    # Reusable service display card
│   │   │   └── RequestCard.jsx    # Reusable request item card
│   │   ├── pages/
│   │   │   ├── Login.jsx          # Login view
│   │   │   ├── Register.jsx       # Registration view
│   │   │   ├── FreelancerDashboard.jsx # Freelancer services & incoming requests
│   │   │   ├── ClientDashboard.jsx     # Client service catalogue & search/filter
│   │   │   ├── AddService.jsx     # Service creation form
│   │   │   ├── EditService.jsx    # Service modification form
│   │   │   ├── ServiceDetails.jsx # Detailed service view & request form
│   │   │   └── MyRequests.jsx     # Client & freelancer requests view
│   │   ├── api.js                 # Centralized Fetch API functions
│   │   ├── App.jsx                # Main application component & routing
│   │   ├── App.css                # Application styles
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # Global CSS resets
│   ├── index.html                 # HTML template
│   ├── vite.config.js             # Vite configuration (port 5173)
│   ├── package.json               # Frontend dependencies & scripts
│   └── .gitignore                 # Frontend gitignore
│
├── requirements.txt               # Package manifest for lab evaluators
├── .gitignore                     # Root gitignore
└── README.md                      # Documentation
```

---

## 6. DATABASE MODELS (MONGOOSE SCHEMAS)

### 1. User Model (`backend/models/User.js`)
| Field | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `name` | String | Required, Trimmed | Full name of user |
| `email` | String | Required, Unique, Lowercase | Unique email address |
| `password` | String | Required | Plaintext password (for educational lab) |
| `role` | String | Required, Enum: `['freelancer', 'client']` | User account role |
| `createdAt` / `updatedAt` | Date | Automatically generated | Timestamps |

### 2. Service Model (`backend/models/Service.js`)
| Field | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `title` | String | Required, Trimmed | Title of service (e.g. Logo Design) |
| `description` | String | Required, Trimmed | Detailed description of service |
| `category` | String | Required, Trimmed | Category (e.g. Graphic Design) |
| `price` | Number | Required, Min: 0 | Price in INR (₹) |
| `freelancerId` | ObjectId | Ref: `'User'`, Required | Reference to the freelancer User document |
| `createdAt` / `updatedAt` | Date | Automatically generated | Timestamps |

### 3. Request Model (`backend/models/Request.js`)
| Field | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `serviceId` | ObjectId | Ref: `'Service'`, Required | Reference to requested Service document |
| `clientId` | ObjectId | Ref: `'User'`, Required | Reference to client User document |
| `freelancerId` | ObjectId | Ref: `'User'`, Required | Reference to freelancer User document |
| `message` | String | Required, Trimmed | Client message with specifications |
| `status` | String | Enum: `['Pending', 'Accepted', 'Rejected']` | Default: `'Pending'` |
| `createdAt` / `updatedAt` | Date | Automatically generated | Timestamps |

---

## 7. REST API ENDPOINTS

### Root Check
- `GET /` - Health check; returns `{ "message": "Student Freelancing Platform API is running" }`

### User APIs (`/api/users`)
- `POST /api/users/register` - Register a new user (`name`, `email`, `password`, `role`)
- `POST /api/users/login` - Authenticate user credentials (`email`, `password`, `role`)

### Service APIs (`/api/services`)
- `POST /api/services` - Create a new service listing
- `GET /api/services` - Fetch all services (with populated freelancer details)
- `GET /api/services/:id` - Fetch single service by ID
- `PUT /api/services/:id` - Update an existing service by ID
- `DELETE /api/services/:id` - Remove a service by ID

### Request APIs (`/api/requests`)
- `POST /api/requests` - Submit a new service request (sets default status `Pending`)
- `GET /api/requests` - Fetch all requests (populated with service, client, and freelancer info)
- `PUT /api/requests/:id` - Update request status (`Accepted` or `Rejected`)

---

## 8. PREREQUISITES & INSTALLATION

### Prerequisites
1. **Node.js** (v18+ recommended): [Download Node.js](https://nodejs.org/)
2. **MongoDB Community Server**: [Download MongoDB](https://www.mongodb.com/try/download/community)
3. **MongoDB Compass** (GUI): [Download Compass](https://www.mongodb.com/try/download/compass)

### Step 1: Install Backend Dependencies
Open a terminal in the project directory:
```bash
cd backend
npm install
```

### Step 2: Install Frontend Dependencies
Open a second terminal:
```bash
cd frontend
npm install
```

---

## 9. HOW TO RUN THE PROJECT LOCALLY

### 1. Ensure Local MongoDB is Running
MongoDB typically runs automatically as a Windows service on port `27017`.
To check in PowerShell:
```powershell
Get-Service -Name MongoDB
```
Or start MongoDB manually:
```bash
mongod
```

### 2. Start the Backend Server
In the `backend` folder:
```bash
npm run dev
```
*(Alternatively: `npm start`)*
Output:
```
Successfully connected to MongoDB: student_freelancing_platform
Server is running on port 5000
```

### 3. Start the Frontend Application
In the `frontend` folder:
```bash
npm run dev
```
Output:
```
  VITE v8.3.2  ready in 150 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open your browser and navigate to:
**`http://localhost:5173`**

---

## 10. MONGODB COMPASS VERIFICATION

1. Open **MongoDB Compass**.
2. Connect using the standard URI:
   ```
   mongodb://127.0.0.1:27017
   ```
3. In the left database pane, locate:
   ```
   student_freelancing_platform
   ```
4. You will observe three collections automatically managed by Mongoose:
   - **`users`**: Contains registered client and freelancer records.
   - **`services`**: Contains all services posted by freelancers.
   - **`requests`**: Contains all service requests and their current status (`Pending`, `Accepted`, `Rejected`).
5. As you perform actions in the frontend UI, click the **Refresh** button in Compass to observe the live MongoDB documents.

---

## 11. TESTING WITH POSTMAN

You can test all REST endpoints directly in Postman or cURL:

### 1. Register Freelancer
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/users/register`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "name": "Student Designer",
    "email": "designer@example.com",
    "password": "123456",
    "role": "freelancer"
  }
  ```

### 2. Register Client
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/users/register`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "name": "Startup Client",
    "email": "client@example.com",
    "password": "123456",
    "role": "client"
  }
  ```

### 3. Login User
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/users/login`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "email": "client@example.com",
    "password": "123456",
    "role": "client"
  }
  ```

### 4. Create Service (As Freelancer)
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/services`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "title": "Logo Design",
    "description": "Affordable vector logo design for startups with 3 revisions.",
    "category": "Graphic Design",
    "price": 500,
    "freelancerId": "REPLACE_WITH_FREELANCER_USER_ID"
  }
  ```

### 5. Get All Services
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/services`

### 6. Get Single Service by ID
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/services/SERVICE_ID`

### 7. Update Service
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/services/SERVICE_ID`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "title": "Premium Logo Design",
    "price": 750
  }
  ```

### 8. Delete Service
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/services/SERVICE_ID`

### 9. Create Request (As Client)
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/requests`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "serviceId": "SERVICE_ID",
    "clientId": "CLIENT_ID",
    "freelancerId": "FREELANCER_ID",
    "message": "I need this logo for my campus tech startup within 3 days."
  }
  ```

### 10. Get All Requests
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/requests`

### 11. Accept Request (As Freelancer)
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/requests/REQUEST_ID`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "status": "Accepted"
  }
  ```

### 12. Reject Request (As Freelancer)
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/requests/REQUEST_ID`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "status": "Rejected"
  }
  ```

---

## 12. CRUD EXPLANATION

CRUD stands for **Create, Read, Update, Delete**, the four fundamental operations of persistent data storage:

1. **Create (C):**
   - Implemented via HTTP `POST` requests.
   - Example 1: Creating a user via `POST /api/users/register` -> `User.create()`.
   - Example 2: Adding a service via `POST /api/services` -> `Service.create()`.
   - Example 3: Submitting a request via `POST /api/requests` -> `Request.create()`.
2. **Read (R):**
   - Implemented via HTTP `GET` requests.
   - Example 1: Fetching all services via `GET /api/services` -> `Service.find().populate()`.
   - Example 2: Fetching service details via `GET /api/services/:id` -> `Service.findById()`.
   - Example 3: Listing requests via `GET /api/requests` -> `Request.find().populate()`.
3. **Update (U):**
   - Implemented via HTTP `PUT` requests.
   - Example 1: Editing service details via `PUT /api/services/:id` -> `Service.findByIdAndUpdate()`.
   - Example 2: Updating request status via `PUT /api/requests/:id` -> `Request.findByIdAndUpdate()`.
4. **Delete (D):**
   - Implemented via HTTP `DELETE` requests.
   - Example: Removing a service via `DELETE /api/services/:id` -> `Service.findByIdAndDelete()`.

---

## 13. COMPLETE APPLICATION WORKFLOW

```
1. REGISTER
   Client and Freelancer register accounts with their respective role.
   Data saved to MongoDB 'users' collection.
   ↓
2. LOGIN
   User logs in with email, password, and role.
   State stored in React & browser localStorage.
   Redirects to /freelancer or /client.
   ↓
3. FREELANCER CREATES SERVICE
   Freelancer navigates to "Add Service".
   Fills Title, Description, Category, and Price.
   POST /api/services stores document in 'services' collection.
   ↓
4. CLIENT BROWSES SERVICES
   Client visits /client.
   React loads services via GET /api/services.
   Client uses real-time search box and category filter dropdown.
   ↓
5. CLIENT SENDS REQUEST
   Client clicks "View Details" -> /service/:id.
   Client inputs requirement notes and clicks "Send Request".
   POST /api/requests creates document with status "Pending" in 'requests'.
   Client is redirected to "My Requests".
   ↓
6. FREELANCER REVIEWS REQUEST
   Freelancer opens dashboard or "Requests" page.
   Sees the request with client name, message, and "Pending" badge.
   Freelancer clicks "Accept" or "Reject".
   PUT /api/requests/:id updates document in MongoDB.
   ↓
7. CLIENT SEES UPDATED STATUS
   Client visits /requests and sees status badge updated to "Accepted" or "Rejected".
```

---

## 14. GITHUB REPOSITORY INSTRUCTIONS

To push this project to your GitHub account:

```bash
# 1. Initialize Git in the project root
git init

# 2. Add all files (respects .gitignore)
git add .

# 3. Create your initial commit
git commit -m "Initial commit: Student Freelancing Platform MERN Project"

# 4. Link to your GitHub repository
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/student-freelancing-platform.git

# 5. Push code to GitHub
git push -u origin main
```

---

## 15. VIVA QUESTIONS AND ANSWERS FOR STUDENTS

**Q1: What is the MERN stack?**
> **Answer:** MERN stands for MongoDB (database), Express.js (backend web framework), React (frontend library), and Node.js (JavaScript runtime environment). It enables full-stack web development using a single programming language: JavaScript.

**Q2: What is the purpose of Mongoose?**
> **Answer:** Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and translates between objects in code and documents in MongoDB.

**Q3: What does the `.populate()` method do in Mongoose?**
> **Answer:** `.populate()` automatically replaces specified path references (ObjectIds) in a document with the actual documents from referenced collections, similar to a `JOIN` operation in relational databases.

**Q4: How does role-based access control work in this project?**
> **Answer:** Users choose a role (`client` or `freelancer`) during registration. Upon login, this role is stored in React state and `localStorage`. The React Router conditionally renders components and protects routes based on `user.role`.

**Q5: Why is CORS needed in this project?**
> **Answer:** Because the frontend runs on `http://localhost:5173` and the backend runs on `http://localhost:5000`. Web browsers restrict cross-origin HTTP requests by default for security; the `cors` middleware on Express enables the browser to permit communication between different ports.

**Q6: What is the difference between `PUT` and `POST` in REST APIs?**
> **Answer:** `POST` is used to create a new resource on the server (e.g., adding a new service or request). `PUT` is used to update an existing resource identified by an identifier (e.g., updating service details or changing request status to Accepted/Rejected).

**Q7: Why is `localStorage` used?**
> **Answer:** `localStorage` provides persistent client-side key-value storage. It allows the browser to remember the logged-in user even if the user refreshes or reopens the browser page.

**Q8: How is the database connection handled in Express?**
> **Answer:** We use `mongoose.connect(MONGO_URI)` inside `server.js`. The connection string `mongodb://127.0.0.1:27017/student_freelancing_platform` points to the local MongoDB instance. Once connected, Express starts listening on port 5000.
