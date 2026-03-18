#!/bin/sh

set -eu

PORT="${SERVER_PORT:-8080}"
PIDS="$(lsof -ti "tcp:$PORT" -sTCP:LISTEN 2>/dev/null || true)"

if [ -z "$PIDS" ]; then
  echo "No process is listening on port $PORT."
  exit 0
fi

echo "Stopping process(es) on port $PORT: $PIDS"
for PID in $PIDS; do
  kill "$PID"
done

echo "Port $PORT is now free."
