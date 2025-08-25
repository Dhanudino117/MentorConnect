# MentorConnect

A platform connecting students with mentors for learning and guidance.

## Features

- **User Authentication**: Student and Mentor registration/login
- **Profile Management**: Update and manage user profiles
- **Role-based Access**: Different interfaces for students and mentors
- **Real-time Communication**: Chat and video call capabilities
- **Matching System**: Connect students with suitable mentors

## Project Structure

```
MentorConnect/
├── backend/          # Node.js + Express + MongoDB backend
├── frontend/         # React + Vite frontend
└── README.md
```

## Backend Configuration

The backend is configured to run without environment variables. Configuration is stored in `backend/server.js`:

- **MongoDB URI**: `mongodb://localhost:27017/mentorconnect`
- **JWT Secret**: `mentorconnect_jwt_secret_key_2024`
- **Port**: `5000`

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or accessible)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd MentorConnect/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The backend will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd MentorConnect/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/student/auth/register` - Student registration
- `POST /api/student/auth/login` - Student login
- `POST /api/mentor/auth/register` - Mentor registration
- `POST /api/mentor/auth/login` - Mentor login

### Profile Management
- `GET /api/student/profile` - Get student profile
- `PUT /api/student/profile` - Update student profile
- `GET /api/mentor/profile` - Get mentor profile
- `PUT /api/mentor/profile` - Update mentor profile

## Data Storage

- **User Data**: Stored in MongoDB with encrypted passwords
- **Authentication**: JWT tokens for session management
- **Frontend State**: User session data stored in localStorage

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation and sanitization

## Development Notes

- The backend runs without environment variables for simplicity
- All configuration is centralized in `backend/server.js`
- Frontend makes real API calls to the backend
- CORS is enabled for local development

## Troubleshooting

1. **MongoDB Connection Error**: Ensure MongoDB is running locally
2. **Port Already in Use**: Change the port in `backend/server.js`
3. **CORS Issues**: Check that the frontend URL is allowed in CORS settings

## License

MIT License
