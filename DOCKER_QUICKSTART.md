# KCD2 Calculator - Quick Docker Setup

## TL;DR - Get Started in 30 Seconds

```bash
cd C:\_GIT\kcd2Calculator
docker-compose up -d
```

Then open your browser to **http://localhost:5000**

---

## What is Docker?

Docker lets you run the KCD2 Calculator in a container without installing Python or dependencies. It's like running the app in a self-contained environment.

---

## Prerequisites

1. **Download Docker Desktop:**
   - Windows: https://www.docker.com/products/docker-desktop
   - macOS: https://www.docker.com/products/docker-desktop
   - Linux: Install Docker Engine

2. **Verify Installation:**
   ```bash
   docker --version
   docker-compose --version
   ```

---

## Running with Docker

### Start the Container

```bash
docker-compose up -d
```

**What happens:**
- Docker builds the image
- Starts the container
- App runs on http://localhost:5000

### Stop the Container

```bash
docker-compose down
```

### View Logs

```bash
docker-compose logs -f
```

Press `Ctrl+C` to exit logs.

---

## Common Tasks

| Task | Command |
|------|---------|
| Start | `docker-compose up -d` |
| Stop | `docker-compose down` |
| Restart | `docker-compose restart` |
| Rebuild | `docker-compose up -d --build` |
| Logs | `docker-compose logs -f` |
| Status | `docker-compose ps` |

---

## Troubleshooting

### "Port 5000 already in use"

Option 1: Kill the process on port 5000
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

Option 2: Use a different port in `docker-compose.yml`:
```yaml
ports:
  - "8080:5000"  # Use port 8080 instead
```

### "Container won't start"

Check logs:
```bash
docker-compose logs kcd2-calculator
```

Then rebuild:
```bash
docker-compose down
docker-compose up -d --build
```

### "Can't access http://localhost:5000"

Verify the container is running:
```bash
docker-compose ps
```

If it shows "Up", try:
```bash
docker-compose logs kcd2-calculator
```

---

## Advanced Usage

For detailed Docker documentation, see [DOCKER.md](kcd2Calculator/DOCKER.md)

Topics covered:
- Building and running manually
- Custom ports and environments
- Development vs Production
- Deployment options
- Security best practices
- Performance optimization
- Troubleshooting guide

---

## Comparison: Docker vs Direct Execution

| Aspect | Direct (Python) | Docker |
|--------|---|---|
| **Setup** | Install Python, pip install | Just Docker |
| **Dependencies** | Manual | Automatic |
| **Port conflicts** | Manual resolution | Easier management |
| **Cross-platform** | May need adjustments | Same everywhere |
| **Production-ready** | Less isolated | Better isolation |
| **IDE debugging** | Full support | Limited |

---

## File Structure

```
kcd2Calculator/
├── app.py
├── run.py
├── requirements.txt
├── templates/
├── static/
└── docker-entrypoint.sh       ← Startup script

Dockerfile                       ← Image definition
docker-compose.yml              ← Container config
.dockerignore                   ← What to exclude
```

---

## Quick Reference

### Build the image
```bash
docker build -t kcd2-calculator:latest .
```

### Run the container
```bash
docker run -p 5000:5000 kcd2-calculator:latest
```

### Run in background
```bash
docker run -d -p 5000:5000 --name kcd2-calc kcd2-calculator:latest
```

### Access shell inside container
```bash
docker exec -it kcd2-calc bash
```

### View container logs
```bash
docker logs kcd2-calc
```

### Stop the container
```bash
docker stop kcd2-calc
```

### Remove the container
```bash
docker rm kcd2-calc
```

---

## Next Steps

1. ✅ Install Docker
2. ✅ Run `docker-compose up -d`
3. ✅ Open http://localhost:5000
4. ✅ Enjoy! 🎉

---

## Need Help?

Check the full Docker guide: [DOCKER.md](kcd2Calculator/DOCKER.md)

Or use standard Docker commands:
```bash
docker --help
docker-compose --help
```
