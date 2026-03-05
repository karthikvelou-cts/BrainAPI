# Full-Stack Trivia App Prompt

Create a full-stack web application similar to https://opentdb.com/ (Open Trivia Database).

The project must include:

========================
TECH STACK
========================
Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- RESTful API
- dotenv for environment variables
- CORS enabled

Frontend:
- Vue 3 (Composition API)
- Vue Router
- Axios for API calls
- Pinia for state management
- Tailwind CSS for styling

========================
APPLICATION OVERVIEW
========================
Build a trivia database system that allows:
- Public users to fetch trivia questions via API
- Users to browse questions by category, difficulty, and type
- Admin users to create, edit, and delete questions
- Token-based session system like OpenTDB

========================
DATABASE MODELS (MongoDB)
========================

User:
- username (String, required, unique)
- email (String, required, unique)
- password (hashed)
- role (admin | user)
- createdAt

Category:
- name (String, required)
- description (String)

Question:
- category (ObjectId ref Category)
- type (multiple | boolean)
- difficulty (easy | medium | hard)
- question (String)
- correct_answer (String)
- incorrect_answers (Array of Strings)
- createdBy (ObjectId ref User)
- createdAt

Token:
- token (String, unique)
- user (ObjectId ref User)
- expiresAt (Date)

========================
BACKEND FEATURES
========================

1. Auth Routes
- POST /api/auth/register
- POST /api/auth/login

2. Category Routes
- GET /api/categories
- POST /api/categories (admin only)
- PUT /api/categories/:id (admin only)
- DELETE /api/categories/:id (admin only)

3. Question Routes
- GET /api/questions
    Query params:
      - amount
      - category
      - difficulty
      - type
- POST /api/questions (admin only)
- PUT /api/questions/:id (admin only)
- DELETE /api/questions/:id (admin only)

4. Token Routes
- GET /api/token
- DELETE /api/token/:token

5. Implement:
- Pagination
- Filtering
- Input validation
- Proper HTTP status codes
- Error handling middleware

6. API Response format must match OpenTDB style:
{
  "response_code": 0,
  "results": [...]
}

========================
FRONTEND FEATURES (Vue 3)
========================

Pages:
- Home
- Browse Questions
- Category List
- Login/Register
- Admin Dashboard

Components:
- QuestionCard
- CategorySelect
- DifficultyFilter
- Navbar
- Pagination

Features:
- Fetch questions with filters
- Select number of questions
- Display multiple choice & boolean
- Admin can manage questions & categories
- Auth guard for admin routes
- Store JWT in localStorage
- Responsive UI

========================
FOLDER STRUCTURE
========================

Backend:
- /models
- /routes
- /controllers
- /middleware
- /config
- server.js

Frontend:
- /src
  - /components
  - /views
  - /router
  - /stores
  - /services

========================
SECURITY
========================
- Password hashing with bcrypt
- JWT authentication middleware
- Role-based authorization
- Rate limiting
- Helmet security middleware

========================
BONUS FEATURES
========================
- Question import via JSON
- Swagger API documentation
- Docker setup
- Deployment guide

========================
DELIVERABLES
========================
- Full backend code
- Full frontend code
- Environment variable examples
- Setup instructions
- Sample seed data
- README.md

Make the code production-ready, clean, and well-commented.
