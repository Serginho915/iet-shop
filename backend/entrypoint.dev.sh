#!/bin/sh
set -e

python manage.py migrate --noinput

if [ "${LOAD_FIXTURE_ON_STARTUP:-1}" = "1" ] && [ -f "api/fixtures/initial_data.json" ]; then
	TAG_EXISTS=$(python manage.py shell --verbosity 0 -c "from api.models import Tag; print('1' if Tag.objects.exists() else '0')")
	TAG_EXISTS=$(echo "$TAG_EXISTS" | tr -d '\r\n')
	if [ "$TAG_EXISTS" = "0" ]; then
		echo "Loading fixture: api/fixtures/initial_data.json"
		python manage.py loaddata api/fixtures/initial_data.json
	fi
fi

exec daphne -b 0.0.0.0 -p 8000 core.asgi:application
