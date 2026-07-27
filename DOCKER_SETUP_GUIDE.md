# Docker Setup Guide for E-Commerce Application

## Overview
This guide provides step-by-step instructions to dockerize and run your 3-tier e-commerce application using Docker and Docker Compose.

### Application Architecture
```
┌─────────────────┐
│   Frontend      │ (Nginx on port 80)
│   (Port 80)     │
└────────┬────────┘
         │
┌────────▼────────┐
│   Backend       │ (Node.js/Express on port 5000)
│   (Port 5000)   │
└────────┬────────┘
         │
┌────────▼────────┐
│   Database      │ (PostgreSQL on port 5432)
│   (Port 5432)   │
└─────────────────┘
```

## Prerequisites

Before starting, ensure you have:
- **Docker** installed (version 20.10+)
- **Docker Compose** installed (version 1.29+)
- Git (optional)

### Installation Links:
- Docker: https://docs.docker.com/get-docker/
- Docker Compose: https://docs.docker.com/compose/install/

### Verify Installation:
```bash
docker --version
docker-compose --version
```

---

## Step-by-Step Setup

### Step 1: Navigate to Project Directory
```bash
cd Dockerized-3-Tier-E-Commerce-Web-Application
```

### Step 2: Create Environment File (Optional)
```bash
cp .env.example .env
```
Edit `.env` if you need custom database credentials.

### Step 3: Build Docker Images

All containers will be built automatically, but you can build manually:

```bash
# Build all services
docker-compose build

# Or build specific service
docker-compose build frontend
docker-compose build backend
docker-compose build db
```

### Step 4: Start All Services

```bash
# Start all containers in the background
docker-compose up -d

# Or start and view logs
docker-compose up
```

You'll see output like:
```
Creating ecommerce-db        ... done
Creating ecommerce-backend   ... done
Creating ecommerce-frontend  ... done
Creating ecommerce-python-app ... done
```

### Step 5: Verify All Services are Running

```bash
docker-compose ps
```

Expected output:
```
NAME                    STATUS              PORTS
ecommerce-frontend      Up (healthy)        0.0.0.0:80->80/tcp
ecommerce-backend       Up (healthy)        0.0.0.0:5000->5000/tcp
ecommerce-db            Up (healthy)        0.0.0.0:5432->5432/tcp
ecommerce-python-app    Up                  0.0.0.0:8080->8080/tcp
```

---

## Accessing Your Application

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost | Main web interface |
| Backend API | http://localhost:5000 | REST API endpoints |
| Python App | http://localhost:8080 | Python Flask app |
| Database | localhost:5432 | PostgreSQL database |

### Test the Application:

**Frontend (Nginx):**
```bash
curl http://localhost
```

**Backend API:**
```bash
curl http://localhost:5000
```

**Python Flask App:**
```bash
curl http://localhost:8080
```

---

## File Structure Explanation

```
Dockerized-3-Tier-E-Commerce-Web-Application/
├── docker-compose.yml           # Main orchestration file
├── Dockerfile.python            # Python Flask app container
├── .dockerignore                # Files to exclude from Docker build
├── .env.example                 # Environment variables template
│
├── frontend/
│   ├── Dockerfile              # Nginx container definition
│   ├── nginx.conf              # Nginx configuration
│   └── index.html              # Frontend HTML
│
├── backend/
│   ├── Dockerfile              # Node.js container definition
│   ├── package.json            # Node.js dependencies
│   └── index.js                # Backend Express app
│
└── Db/
    └── docker-compose.yml      # Database only (optional, superseded by main compose)
```

---

## Docker Commands Reference

### Container Management
```bash
# View running containers
docker-compose ps

# View container logs
docker-compose logs
docker-compose logs -f backend      # Follow logs for specific service
docker-compose logs -f

# Stop all containers
docker-compose stop

# Start stopped containers
docker-compose start

# Remove containers
docker-compose down

# Remove containers and volumes
docker-compose down -v
```

### Build and Push
```bash
# Rebuild without cache
docker-compose build --no-cache

# Push to registry
docker-compose push
```

### Debugging
```bash
# Execute command in running container
docker-compose exec backend npm start
docker-compose exec backend bash

# View resource usage
docker stats

# Inspect container details
docker inspect ecommerce-backend
```

---

## Environment Variables

The application uses these environment variables:

**Database Configuration:**
- `DB_USER`: Database username (default: ecommerce_user)
- `DB_PASSWORD`: Database password (default: ecommerce_pass)
- `DB_HOST`: Database host (default: db)
- `DB_NAME`: Database name (default: ecommerce_db)
- `DB_PORT`: Database port (default: 5432)

**Application Configuration:**
- `NODE_ENV`: Node environment (production/development)
- `FLASK_ENV`: Flask environment (production/development)

---

## Troubleshooting

### Issue: Containers won't start
**Solution:**
```bash
# Check logs
docker-compose logs

# Rebuild everything
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

### Issue: Database connection errors
**Solution:**
```bash
# Verify database is running
docker-compose exec db pg_isready -U ecommerce_user

# Check environment variables
docker-compose config
```

### Issue: Port already in use
**Solution:**
```bash
# Find what's using the port (Linux/Mac)
lsof -i :80
lsof -i :5000
lsof -i :5432

# Or use docker-compose override
# Edit docker-compose.yml and change ports

# Restart Docker daemon (as last resort)
docker system prune -a
```

### Issue: Out of disk space
**Solution:**
```bash
# Remove unused images and containers
docker system prune

# Remove all unused volumes
docker volume prune
```

---

## Production Recommendations

For production deployment, consider:

1. **Security:**
   - Use strong database passwords
   - Add SSL/TLS certificates
   - Implement authentication

2. **Performance:**
   - Add caching (Redis)
   - Use environment-specific configs
   - Optimize images

3. **Monitoring:**
   - Add health checks ✓ (already implemented)
   - Set up logging aggregation
   - Monitor resource usage

4. **Scaling:**
   - Use Docker Swarm or Kubernetes
   - Load balance services
   - Database replication

---

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Best Practices for Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)
- [Nginx Docker Image](https://hub.docker.com/_/nginx)
- [Node.js Docker Image](https://hub.docker.com/_/node)

---

## Quick Start Summary

```bash
# 1. Navigate to project
cd Dockerized-3-Tier-E-Commerce-Web-Application

# 2. Start all containers
docker-compose up -d

# 3. View status
docker-compose ps

# 4. Access application
# Frontend: http://localhost
# Backend: http://localhost:5000
# Database: localhost:5432

# 5. View logs
docker-compose logs -f

# 6. Stop when done
docker-compose down
```

---

For questions or issues, refer to the official Docker documentation or the troubleshooting section above.
