#!/bin/sh
set -e

python manage.py migrate --noinput

echo "Resetting DB data and loading fixture: api/fixtures/initial_data.json"
python manage.py flush --noinput
python manage.py loaddata api/fixtures/initial_data.json

exec python manage.py runserver 0.0.0.0:8000
