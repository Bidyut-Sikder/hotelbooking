


# Frontend build
FROM node:18 AS frontend-builder
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Backend build
FROM node:18 AS backend-builder
WORKDIR /backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend ./

# Final image
FROM node:18
WORKDIR /app
COPY --from=backend-builder /backend ./
COPY --from=frontend-builder /frontend/dist /frontend/dist
RUN npm run build
ENV PORT=8000
EXPOSE 8000
CMD ["npm", "start"]


















# # Use a multi-stage build for frontend
# FROM node:18 AS frontend-builder
# WORKDIR /app/frontend
# COPY frontend/package.json frontend/package-lock.json ./
# RUN npm install
# COPY frontend ./
# RUN npm run build

# # Backend build
# FROM node:18 AS backend-builder
# WORKDIR /app/backend
# COPY backend/package.json backend/package-lock.json ./
# RUN npm install
# COPY backend ./

# # Copy frontend build into backend
# COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# # Final image to run the backend
# FROM node:18
# WORKDIR /app
# COPY --from=backend-builder /app/backend ./
# RUN npm run build
# ENV PORT=8000
# EXPOSE 8000
# CMD ["npm", "start"]








