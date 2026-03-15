#!/bin/sh
set -e

python manage.py migrate --noinput

echo "Resetting DB data and loading fixture: api/fixtures/initial_data.json"
python manage.py flush --noinput
python manage.py loaddata api/fixtures/initial_data.json

exec daphne -b 0.0.0.0 -p 8000 core.asgi:application
