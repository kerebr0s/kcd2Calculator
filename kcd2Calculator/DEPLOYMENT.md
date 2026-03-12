# KCD2 Calculator - Complete Deployment Guide

## Overview

This guide covers deployment scenarios for the KCD2 Calculator:

1. **Local Docker** - Run on your machine
2. **Docker Compose** - Multi-container orchestration
3. **Cloud Deployment** - AWS, Azure, GCP
4. **Production Setup** - Best practices

---

## Table of Contents

1. [Local Docker Setup](#local-docker-setup)
2. [Docker Compose](#docker-compose)
3. [Cloud Deployment](#cloud-deployment)
4. [Production Checklist](#production-checklist)
5. [Monitoring & Logging](#monitoring--logging)

---

## Local Docker Setup

### Prerequisites

- Docker installed and running
- Port 5000 available

### Quick Start

```bash
# Navigate to project directory
cd C:\_GIT\kcd2Calculator

# Build the image
docker build -t kcd2-calculator:latest .

# Run the container
docker run -d -p 5000:5000 --name kcd2-calc kcd2-calculator:latest

# View logs
docker logs -f kcd2-calc

# Stop the container
docker stop kcd2-calc
```

### Access the Application

Open your browser to: **http://localhost:5000**

### Using Makefile (Recommended)

```bash
make up          # Start
make logs        # View logs
make down        # Stop
make rebuild     # Rebuild and restart
```

---

## Docker Compose

### Why Docker Compose?

- Single command to manage containers
- Easy configuration in one file
- Better for local development
- Volume mounting for development
- Environment variables management

### Quick Start

```bash
# Start all services
docker-compose up -d

# View status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Configuration

File: `docker-compose.yml`

```yaml
version: '3.8'

services:
  kcd2-calculator:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: kcd2-calculator
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
      - FLASK_RUN_HOST=0.0.0.0
      - FLASK_RUN_PORT=5000
    restart: unless-stopped
    volumes:
      - ./kcd2Calculator:/app  # Development
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 5s
```

### Development vs Production

**Development:**
- Keep volumes mounted
- Use `FLASK_ENV=development`
- Enable debug mode
- Include all logs

**Production:**
- Remove volumes
- Use `FLASK_ENV=production`
- Disable debug mode
- Minimal logging

---

## Cloud Deployment

### AWS Deployment

#### Option 1: AWS App Runner (Easiest)

1. **Push to GitHub**
   ```bash
   git push origin master
   ```

2. **Create App Runner service:**
   - AWS Console → App Runner → Create Service
   - Repository: Your GitHub repo
   - Branch: master
   - Configuration: Dockerfile detected automatically

3. **Access:**
   - App Runner provides public URL
   - Wait 2-3 minutes for deployment

#### Option 2: AWS ECS (Containers)

1. **Create ECR repository:**
   ```bash
   aws ecr create-repository --repository-name kcd2-calculator
   ```

2. **Push image:**
   ```bash
   aws ecr get-login-password | docker login --username AWS --password-stdin <account>.dkr.ecr.<region>.amazonaws.com
   docker tag kcd2-calculator:latest <account>.dkr.ecr.<region>.amazonaws.com/kcd2-calculator:latest
   docker push <account>.dkr.ecr.<region>.amazonaws.com/kcd2-calculator:latest
   ```

3. **Create ECS task definition:**
   - Reference ECR image
   - Port 5000
   - Memory: 512 MB
   - CPU: 256

4. **Create ECS service:**
   - Launch task
   - Load balancer (ALB)
   - Auto-scaling (optional)

#### Option 3: Docker Hub + AWS (Simple)

1. **Push to Docker Hub:**
   ```bash
   docker tag kcd2-calculator username/kcd2-calculator:latest
   docker push username/kcd2-calculator:latest
   ```

2. **Run on EC2:**
   ```bash
   ssh into instance
   docker login
   docker run -d -p 80:5000 username/kcd2-calculator:latest
   ```

### Azure Deployment

#### Azure Container Instances (Fastest)

```bash
# Create resource group
az group create --name kcd2-rg --location eastus

# Deploy container
az container create \
  --resource-group kcd2-rg \
  --name kcd2-calculator \
  --image username/kcd2-calculator:latest \
  --ports 5000 \
  --environment-variables FLASK_ENV=production
```

#### Azure App Service

1. **Create App Service Plan:**
   ```bash
   az appservice plan create --name kcd2-plan --resource-group kcd2-rg --sku B1 --is-linux
   ```

2. **Create Web App:**
   ```bash
   az webapp create \
     --resource-group kcd2-rg \
     --plan kcd2-plan \
     --name kcd2-calculator \
     --deployment-container-image-name username/kcd2-calculator:latest
   ```

### GCP Deployment

#### Google Cloud Run (Serverless)

```bash
# Deploy
gcloud run deploy kcd2-calculator \
  --source . \
  --platform managed \
  --region us-central1 \
  --port 5000 \
  --set-env-vars FLASK_ENV=production
```

Access via provided Cloud Run URL.

---

## Production Checklist

### Security

- [ ] Use environment variables for secrets
- [ ] Enable HTTPS/TLS
- [ ] Implement authentication if needed
- [ ] Set proper CORS headers
- [ ] Regular security updates
- [ ] Scan images for vulnerabilities:
  ```bash
  docker scan kcd2-calculator:latest
  ```

### Performance

- [ ] Set resource limits (CPU, memory)
- [ ] Configure auto-scaling
- [ ] Enable caching headers
- [ ] Optimize database queries
- [ ] Monitor performance metrics

### Monitoring

- [ ] Set up logging
- [ ] Monitor container health
- [ ] Alert on failures
- [ ] Track resource usage
- [ ] Monitor response times

### Backup & Recovery

- [ ] Document deployment process
- [ ] Version control Dockerfile
- [ ] Tag images with versions
- [ ] Keep deployment logs
- [ ] Test disaster recovery

### Example Production docker-compose.yml

```yaml
version: '3.8'

services:
  kcd2-calculator:
    image: username/kcd2-calculator:v1.0.0
    container_name: kcd2-calculator
    restart: always
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
      - DEBUG=False
    resources:
      limits:
        cpus: '1'
        memory: 512M
      reservations:
        cpus: '0.5'
        memory: 256M
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

---

## Monitoring & Logging

### View Container Logs

```bash
# Live logs
docker-compose logs -f

# Last 100 lines
docker logs --tail 100 kcd2-calc

# Specific service
docker-compose logs -f kcd2-calculator
```

### Health Checks

```bash
# Check status
docker-compose ps

# Manual health check
curl -f http://localhost:5000/ || echo "Unhealthy"
```

### Resource Monitoring

```bash
# View resource usage
docker stats kcd2-calc

# Inspect container
docker inspect kcd2-calc
```

### Production Logging

Add to docker-compose.yml:

```yaml
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

Or use external logging:

```yaml
logging:
  driver: "awslogs"
  options:
    awslogs-group: "/ecs/kcd2-calculator"
    awslogs-region: "us-east-1"
```

---

## Continuous Deployment

### GitHub Actions Workflow

See `.github/workflows/docker-build.yml` for automated testing and building.

Triggers on:
- Push to master
- Pull requests

Actions:
- Build Docker image
- Test container startup
- Cache builds for speed

---

## Troubleshooting Deployment

### Container Won't Start

```bash
docker-compose logs kcd2-calculator
docker inspect kcd2-calc
```

### Port Conflicts

```bash
# Find process on port 5000
netstat -ano | findstr :5000

# Or change port in docker-compose.yml
ports:
  - "8080:5000"
```

### Out of Memory

Increase Docker memory allocation:
- Docker Desktop Settings → Resources
- Or limit container:
  ```yaml
  mem_limit: 1g
  ```

### Slow Performance

- Check resource limits
- Review application logs
- Monitor CPU/memory usage
- Optimize Flask app
- Consider scaling

---

## Summary

| Deployment | Complexity | Cost | Best For |
|-----------|-----------|------|----------|
| Local Docker | Low | $0 | Development |
| Docker Compose | Low | $0 | Local testing |
| AWS App Runner | Medium | $$ | Small apps |
| AWS ECS | High | $$ | Production |
| Azure Container | Medium | $$ | Azure users |
| Cloud Run | Low | $ | Serverless |

---

## Quick Commands Reference

```bash
# Build
docker build -t kcd2-calculator:latest .
docker-compose build

# Run
docker run -p 5000:5000 kcd2-calculator:latest
docker-compose up -d

# Stop
docker stop <container>
docker-compose down

# Logs
docker logs -f <container>
docker-compose logs -f

# Shell
docker exec -it <container> bash

# Remove
docker rm <container>
docker rmi <image>
```

---

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Guide](https://docs.docker.com/compose/)
- [AWS Container Services](https://aws.amazon.com/containers/)
- [Azure Container Services](https://azure.microsoft.com/en-us/services/container-instances/)
- [Google Cloud Run](https://cloud.google.com/run)

---

## Support

For deployment issues:
1. Check logs: `docker logs <container>`
2. Verify configuration
3. Test locally first
4. Check cloud documentation
5. Review security groups/firewalls

Good luck! 🚀
