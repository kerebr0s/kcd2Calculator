# KCD2 Calculator - Docker Deployment Guide

## Overview

This guide explains how to run the KCD2 Potion Calculator using Docker. Docker allows you to run the application in a containerized environment without needing to install Python or dependencies on your machine.

---

## Prerequisites

### Required
- **Docker** - Download from [docker.com](https://www.docker.com/products/docker-desktop)
- **Docker Compose** - Usually included with Docker Desktop

### Verify Installation
```bash
docker --version
docker-compose --version
```

### Supported Platforms
- ✅ Windows (Docker Desktop)
- ✅ macOS (Docker Desktop)
- ✅ Linux (Docker Engine)

---

## Quick Start

### 1. Build and Run with Docker Compose (Recommended)

```bash
cd C:\_GIT\kcd2Calculator

# Start the container
docker-compose up -d

# View logs
docker-compose logs -f
```

The app will be available at **http://localhost:5000**

### 2. Stop the Container

```bash
docker-compose down
```

### 3. Rebuild After Changes

```bash
docker-compose up -d --build
```

---

## Using Docker Commands Directly

### Build the Image

```bash
docker build -t kcd2-calculator:latest .
```

### Run the Container

```bash
docker run -p 5000:5000 --name kcd2-calc kcd2-calculator:latest
```

### Run in Background

```bash
docker run -d -p 5000:5000 --name kcd2-calc kcd2-calculator:latest
```

### View Logs

```bash
docker logs kcd2-calc
```

### Stop the Container

```bash
docker stop kcd2-calc
```

### Remove the Container

```bash
docker rm kcd2-calc
```

---

## Configuration

### Environment Variables

The container uses these environment variables:

```
FLASK_ENV=production      # Environment mode
FLASK_RUN_HOST=0.0.0.0   # Bind to all interfaces
FLASK_RUN_PORT=5000      # Port number
PYTHONUNBUFFERED=1       # Direct output to logs
```

### Custom Port

To run on a different port, modify `docker-compose.yml`:

```yaml
ports:
  - "8080:5000"  # Map host port 8080 to container port 5000
```

Then access at **http://localhost:8080**

---

## Development vs Production

### Development Mode

For development with live code reloading, use docker-compose with mounted volumes:

```bash
docker-compose up -d
```

The `docker-compose.yml` includes:
```yaml
volumes:
  - ./kcd2Calculator:/app  # Mount source code
```

### Production Mode

For production deployment, remove the volumes section and rebuild:

```bash
docker-compose -f docker-compose.yml up -d
```

---

## Docker Compose Reference

### Start Services
```bash
docker-compose up              # Foreground
docker-compose up -d           # Background
docker-compose up --build      # Rebuild images
```

### Stop Services
```bash
docker-compose stop            # Graceful stop
docker-compose down            # Stop and remove containers
docker-compose down -v         # Remove volumes too
```

### View Status
```bash
docker-compose ps              # List running services
docker-compose logs            # Show all logs
docker-compose logs -f         # Follow logs
docker-compose logs kcd2-calculator  # Specific service
```

### Health Check
```bash
docker-compose ps              # Shows health status
```

---

## Common Tasks

### Access Application Container Shell

```bash
docker exec -it kcd2-calc bash
```

### Check Container Logs in Real-Time

```bash
docker-compose logs -f kcd2-calculator
```

### Rebuild After Code Changes

```bash
# Using docker-compose
docker-compose down
docker-compose up -d --build

# OR using docker
docker build -t kcd2-calculator:latest .
docker stop kcd2-calc
docker rm kcd2-calc
docker run -d -p 5000:5000 --name kcd2-calc kcd2-calculator:latest
```

### View Resource Usage

```bash
docker stats kcd2-calc
```

### Copy Files from Container

```bash
docker cp kcd2-calc:/app/file.txt ./local-file.txt
```

---

## Troubleshooting

### Port Already in Use

If port 5000 is already in use:

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
lsof -i :5000
kill -9 <PID>
```

Or use a different port in `docker-compose.yml`:
```yaml
ports:
  - "5001:5000"
```

### Container Won't Start

Check logs:
```bash
docker-compose logs kcd2-calculator
```

Common issues:
- Port in use → Change port in docker-compose.yml
- Old image → Run `docker-compose up --build`
- Permissions → Run with `sudo` on Linux

### Health Check Failing

The container includes health checks. If they fail:

```bash
docker ps                           # Check status
docker-compose logs kcd2-calculator # View error logs
```

### Application Not Accessible

Verify:
```bash
# Check if container is running
docker ps

# Check port mapping
docker port kcd2-calc

# Test connectivity
curl http://localhost:5000
```

---

## Performance Optimization

### Memory Limit

```bash
docker run -m 512m -p 5000:5000 kcd2-calculator:latest
```

Or in docker-compose.yml:
```yaml
services:
  kcd2-calculator:
    mem_limit: 512m
```

### CPU Limit

```yaml
services:
  kcd2-calculator:
    cpus: '0.5'
```

---

## File Structure

```
kcd2Calculator/
├── app.py                 # Flask app entry point
├── run.py                # Application runner
├── config.py             # Configuration classes
├── requirements.txt      # Python dependencies
├── templates/            # HTML templates
│   └── index.html
├── static/               # CSS, JavaScript
│   ├── style.css
│   └── app.js
├── data.py              # Data definitions
└── calculator.py        # Calculation logic

Dockerfile               # Docker image definition
docker-compose.yml      # Docker Compose configuration
.dockerignore          # Files to exclude from image
```

---

## Deployment Platforms

### Docker Hub

Push to Docker Hub for easy distribution:

```bash
# Login
docker login

# Tag image
docker tag kcd2-calculator:latest username/kcd2-calculator:latest

# Push
docker push username/kcd2-calculator:latest

# Pull on another machine
docker pull username/kcd2-calculator:latest
```

### AWS, Azure, GCP

All cloud providers support Docker containers:
- **AWS:** ECS, EKS, Fargate
- **Azure:** Container Instances, App Service
- **GCP:** Cloud Run, Cloud Engine

### Local Network

Access from another machine on your network:

```bash
# Get your machine's IP
ipconfig getifaddr en0          # macOS
hostname -I                     # Linux
ipconfig                        # Windows

# Access from another machine
http://<YOUR_IP>:5000
```

---

## Security Considerations

### Production Security

1. **Use environment variables for secrets:**
   ```yaml
   environment:
     - FLASK_ENV=production
     - DEBUG=False
   ```

2. **Run as non-root user:**
   Add to Dockerfile:
   ```dockerfile
   RUN useradd -m appuser
   USER appuser
   ```

3. **Use security scanning:**
   ```bash
   docker scan kcd2-calculator:latest
   ```

### Network Security

- Only expose necessary ports
- Use environment variables for sensitive data
- Implement HTTPS if exposing to internet

---

## Advanced Usage

### Multi-Stage Build

For smaller images, use multi-stage builds:

```dockerfile
FROM python:3.9-slim as builder
# ... build steps ...

FROM python:3.9-slim
# ... runtime steps ...
```

### Custom Entrypoint

Create `docker-entrypoint.sh`:

```bash
#!/bin/bash
echo "Starting KCD2 Calculator..."
python run.py
```

Add to Dockerfile:
```dockerfile
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
```

### Health Checks

Docker includes health checks:

```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/ || exit 1
```

---

## Summary

| Task | Command |
|------|---------|
| **Start (recommended)** | `docker-compose up -d` |
| **Stop** | `docker-compose down` |
| **View logs** | `docker-compose logs -f` |
| **Rebuild** | `docker-compose up -d --build` |
| **Access shell** | `docker exec -it kcd2-calc bash` |
| **Check status** | `docker-compose ps` |

---

## Next Steps

1. ✅ **Install Docker** - https://www.docker.com/products/docker-desktop
2. ✅ **Start the container** - `docker-compose up -d`
3. ✅ **Open browser** - http://localhost:5000
4. ✅ **View logs** - `docker-compose logs -f`

---

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Guide](https://docs.docker.com/compose/)
- [Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)

---

## Support

For issues:
1. Check logs: `docker-compose logs`
2. Verify ports: `docker-compose ps`
3. Test locally: `curl http://localhost:5000`
4. Check GitHub issues
