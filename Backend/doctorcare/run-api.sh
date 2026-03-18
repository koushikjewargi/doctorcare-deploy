#!/bin/sh

set -eu

APP_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
PORT="${SERVER_PORT:-8080}"

find_pid() {
  lsof -ti "tcp:$PORT" -sTCP:LISTEN 2>/dev/null | head -n 1
}

PID="$(find_pid || true)"

if [ -n "${PID:-}" ]; then
  echo "Port $PORT is already in use by PID $PID."
  echo "If that is your running backend, use it directly:"
  echo "  http://localhost:$PORT/api/health"
  echo
  echo "If you want to restart it, run:"
  echo "  sh \"$APP_DIR/stop-api.sh\""
  echo
  echo "Or run on another port:"
  echo "  SERVER_PORT=8081 sh \"$APP_DIR/run-api.sh\""
  exit 1
fi

cd "$APP_DIR"
exec sh mvnw -DskipTests spring-boot:run
