.PHONY: help build up down logs restart rebuild shell clean status

help:
	@echo "KCD2 Calculator - Docker Makefile Commands"
	@echo ""
	@echo "Available commands:"
	@echo "  make up              - Start containers"
	@echo "  make down            - Stop containers"
	@echo "  make build           - Build Docker image"
	@echo "  make rebuild         - Rebuild and restart containers"
	@echo "  make logs            - View container logs (live)"
	@echo "  make status          - Show container status"
	@echo "  make restart         - Restart containers"
	@echo "  make shell           - Access container shell"
	@echo "  make clean           - Remove all containers and images"
	@echo ""

build:
	docker-compose build

up:
	docker-compose up -d
	@echo ""
	@echo "✓ Application started!"
	@echo "✓ Access at: http://localhost:5000"
	@echo ""

down:
	docker-compose down

logs:
	docker-compose logs -f kcd2-calculator

status:
	docker-compose ps

restart:
	docker-compose restart

rebuild: down build up
	@echo ""
	@echo "✓ Application rebuilt and restarted!"
	@echo ""

shell:
	docker exec -it kcd2-calculator bash

clean:
	docker-compose down -v
	docker system prune -f
	@echo ""
	@echo "✓ Cleaned up Docker resources"
	@echo ""
