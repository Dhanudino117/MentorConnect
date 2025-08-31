# Stage 1: Build frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install
COPY frontend ./frontend
RUN cd frontend && npm run build

# Stage 2: Build backend
FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY backend ./backend

# Copy frontend build into backend public folder
COPY --from=frontend-build /app/frontend/dist ./backend/public

# Set working directory to backend
WORKDIR /app/backend

# Expose backend port
EXPOSE 5000

# Start backend server (it will serve frontend from /public)
CMD ["node", "server.js"]
