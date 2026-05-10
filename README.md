# EC335 Healthcare System

A secure healthcare management system using ReactJS, ExpressJS, MongoDB Atlas, and CP-ABE encryption service.

---

# Technologies Used

## Frontend
- ReactJS
- Axios
- React Router DOM

## Backend
- ExpressJS
- MongoDB Atlas
- JWT Authentication
- Docker

## Encryption Service
- Python
- CP-ABE
- Docker

---

# System Architecture

```text
Frontend (ReactJS)
        ↓
Backend API (ExpressJS)
        ↓
Crypto Service (CP-ABE)
        ↓
MongoDB Atlas
```

---

# Requirements

Before running the system, install:

- Node.js 20+
- Docker Desktop
- npm

---

# Frontend Setup

## Clone frontend repository

```bash
git clone https://github.com/ducktan/health-vault
```

## Go to frontend folder

```bash
cd frontend/my-app
```

## Install dependencies and run

```bash
npm install

```

---



# Backend & Crypto Service Setup

## Pull crypto service image

```bash
docker pull ductan2k4/ec335-service:latest
```

## Create Docker network

```bash
docker network create health-net
```

## Run crypto service container

```bash
docker run -d --network health-net --name crypto-service -p 8000:8000 ductan2k4/ec335-service:latest
```

---

## Pull backend image

```bash
docker pull ductan2k4/health-backend:latest
```

---

# Backend Environment Variables

Create a `.env` file in your current terminal directory.

You can copy from:

```text
.env.example
```

---

## Run backend container

```bash
docker run -d --network health-net --name backend -p 5000:5000 --env-file .env ductan2k4/health-backend:latest
```

---

# Run Frontend

## Vite

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

# API Connection

Frontend communicates with backend through:

```text
http://localhost:5000/api
```

Backend communicates with crypto service through Docker internal network:

```text
http://crypto-service:8000
```

---

# Useful Commands

## Show running containers

```bash
docker ps
```

---

## View backend logs

```bash
docker logs backend
```

---

## View crypto service logs

```bash
docker logs crypto-service
```

---

## Stop containers

```bash
docker stop backend crypto-service
```

---

## Remove containers

```bash
docker rm backend crypto-service
```

---

# Important Notes

- Backend and Crypto Service must be connected to the same Docker network (`health-net`)
- Do NOT use:

```text
http://127.0.0.1:8000
```

inside backend container
- Docker containers must be running before starting frontend
- MongoDB Atlas must allow network access from your current IP address

---

# Authors

EC335 Web Security Project