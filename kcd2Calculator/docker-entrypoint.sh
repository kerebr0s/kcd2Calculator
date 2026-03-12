#!/bin/bash

# KCD2 Calculator Docker Entrypoint Script

set -e

echo "================================"
echo "KCD2 Potion Calculator"
echo "================================"
echo ""
echo "Environment: $FLASK_ENV"
echo "Host: $FLASK_RUN_HOST"
echo "Port: $FLASK_RUN_PORT"
echo ""

# Wait for any dependent services if needed
if [ ! -z "$WAIT_FOR_HOST" ]; then
    echo "Waiting for $WAIT_FOR_HOST..."
    timeout 15 bash -c "until curl -s $WAIT_FOR_HOST > /dev/null; do echo 'waiting...'; sleep 1; done" || true
    echo "Dependency available"
    echo ""
fi

# Run the application
echo "Starting application..."
python run.py
