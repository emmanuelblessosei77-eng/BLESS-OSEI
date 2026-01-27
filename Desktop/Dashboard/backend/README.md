# Dashboard Backend

Express.js backend with PostgreSQL for the Dashboard app.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and update with your PostgreSQL credentials:
```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dashboard_db
DB_USER=postgres
DB_PASSWORD=your_password_here
NODE_ENV=development
```

### 3. Set Up PostgreSQL Database
Make sure PostgreSQL is running, then run the migration script:
```bash
npm run migrate
```

This will:
- Create the database (if it doesn't exist)
- Create tables for users, tasks, and subtasks

### 4. Start the Server

Development (with auto-reload):
```bash
npm run dev
```

Production:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Tasks
- `GET /api/tasks` - Get all tasks for user
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:taskId` - Update task
- `DELETE /api/tasks/:taskId` - Delete task

### Subtasks
- `POST /api/tasks/:taskId/subtasks` - Add subtask
- `PUT /api/tasks/subtasks/:subtaskId` - Update subtask
- `DELETE /api/tasks/subtasks/:subtaskId` - Delete subtask

## User ID Tracking

Pass user ID in requests via:
- `x-user-id` header
- `user_id` query parameter
- `user_id` in request body
