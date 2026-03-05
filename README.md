# BrainyQuizy Platform

Full-stack MEVN platform with:
- Public question APIs (filter, pagination)
- User-owned question dashboard (create/update/delete only own questions)
- Admin dashboard for category and global question management
- JWT auth, token sessions, safety validation, Swagger docs, Docker, and Vercel-ready deployment

## Tech Stack

- Backend: Node.js, Express.js, MongoDB + Mongoose, JWT, bcrypt, Helmet, CORS, rate limiting, express-validator
- Frontend: Vue 3 (Composition API), Vue Router, Pinia, Axios, Tailwind CSS, Vite
- Docs/Infra: Swagger UI, Postman collection, Docker, Vercel

## Project Structure

- `backend/`
  - `models/`, `controllers/`, `routes/`, `middleware/`, `config/`, `utils/`, `docs/`, `scripts/`
  - `app.js`, `server.js`, `api/index.js`
- `frontend/`
  - `src/components/`, `src/views/`, `src/router/`, `src/stores/`, `src/services/`
- `postman/`
  - `BrainAPI.postman_collection.json`

## Application Flow

### Public User Flow

1. Open homepage and browse questions.
2. Call `GET /api/questions` with optional filters:
   - `amount`, `category`, `difficulty`, `type`, `page`, `limit`, `token`
3. Browse categories via `GET /api/categories`.

### Auth Flow

1. Register via `POST /api/auth/register`.
2. Login via `POST /api/auth/login`.
3. JWT token is stored in frontend localStorage.

### User Dashboard Flow (non-admin)

1. Login as normal user.
2. Go to `/dashboard`.
3. Create own question via `POST /api/questions/my`.
4. List own questions via `GET /api/questions/my`.
5. Update/Delete only own questions:
   - `PUT /api/questions/my/:id`
   - `DELETE /api/questions/my/:id`

### Admin Flow

1. Login as admin.
2. Access `/admin`.
3. Manage categories (admin-only):
   - `POST /api/categories`
   - `PUT /api/categories/:id`
   - `DELETE /api/categories/:id`
4. Manage all questions (admin-only):
   - `POST /api/questions`
   - `PUT /api/questions/:id`
   - `DELETE /api/questions/:id`
   - `POST /api/questions/import`

### Token Session Flow

1. Generate token via `GET /api/token` (JWT required).
2. Use it in `GET /api/questions?token=<sessionToken>`.
3. Invalidate via `DELETE /api/token/:token`.

## Access Control Matrix

- Public (no JWT):
  - `GET /api/questions`, `GET /api/categories`
- Authenticated user:
  - `/api/questions/my*`, `/api/token*`
- Admin only:
  - `/api/categories` write ops
  - `/api/questions` global write ops and import

## Content Safety Validation

Question create/update/import requests are blocked (400) when content matches offensive/violence/adult/self-harm patterns.

## API Response Format

`GET /api/questions` and `GET /api/questions/my` return:

```json
{
  "response_code": 0,
  "results": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## Backend Setup

1. `cd backend`
2. `npm install`
3. `copy .env.example .env` (Windows) or `cp .env.example .env`
4. Update `.env`
5. `npm run seed` (optional)
6. `npm run dev`

Backend URL: `http://localhost:5000`

## Frontend Setup

1. `cd frontend`
2. `npm install`
3. `copy .env.example .env` (Windows) or `cp .env.example .env`
4. `npm run dev`

Frontend URL: `http://localhost:5173`

## Environment Variables

### Backend (`backend/.env`)

- `NODE_ENV`
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `TOKEN_TTL_HOURS`
- `CORS_ORIGIN`
- `RATE_LIMIT_WINDOW_MS`
- `RATE_LIMIT_MAX`
- `ADMIN_USERNAME`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

### Frontend (`frontend/.env`)

- `VITE_API_URL` (optional; defaults to `/api` in single Vercel deployment)

## Swagger Docs

- UI: `http://localhost:5000/api/docs`
- JSON: `http://localhost:5000/api/docs.json`

Production:
- UI: `https://brainyquizy.vercel.app/api/docs`
- JSON: `https://brainyquizy.vercel.app/api/docs.json`

## Postman Collection

Import:
- `postman/BrainAPI.postman_collection.json`

Collection includes:
- Auth
- Categories (public/admin)
- Questions (public)
- Questions (user-own)
- Questions (admin)
- Token
- Swagger docs endpoints

## Sample Data and Import

- Seed script: `backend/scripts/seed.js`
- Sample import files:
  - `backend/scripts/sample-import.json`
  - `backend/scripts/quiz-sample-data.json`
  - `backend/scripts/quiz-100-questions.json`

Admin import example:

```bash
curl -X POST http://localhost:5000/api/questions/import \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_JWT_TOKEN>" \
  --data-binary "@backend/scripts/quiz-100-questions.json"
```

## Docker

Run full local stack:

```bash
docker compose up --build
```

Services:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- MongoDB: `mongodb://localhost:27017`

## Deployment (Single Vercel Project)

Deploy one Vercel project from repo root.

Vercel reads root `vercel.json` to:
- Build frontend from `frontend/package.json`
- Run backend serverless function from `backend/api/index.js`
- Route `/api/*` to backend
- Route non-API paths to frontend app

Recommended Vercel env vars:
- `NODE_ENV=production`
- `MONGO_URI=<atlas-uri>`
- `JWT_SECRET=<strong-secret>`
- `JWT_EXPIRES_IN=1d`
- `TOKEN_TTL_HOURS=6`
- `CORS_ORIGIN=https://<your-project>.vercel.app,http://localhost:5173`
- `RATE_LIMIT_WINDOW_MS=900000`
- `RATE_LIMIT_MAX=200`

## Troubleshooting

### `/api/docs` blank on Vercel

- Ensure latest backend is deployed.
- Verify `/api/docs.json` returns JSON.
- Hard refresh browser cache.

### Category filter returns empty

- Confirm data exists for selected filter combination.
- Try category-only first, then add `difficulty`/`type`.

### Admin/User dashboard routing

- `/admin` requires admin role.
- `/dashboard` is for authenticated users.
- Clear localStorage (`brainapi_token`, `brainapi_user`) and relogin if role looks stale.
