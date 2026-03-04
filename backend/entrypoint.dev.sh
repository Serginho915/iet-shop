#!/bin/sh
set -e

python manage.py migrate --noinput

if [ "${LOAD_FIXTURE_ON_STARTUP:-1}" = "1" ] && [ -f "api/fixtures/initial_data.json" ]; then
	CAN_LOAD_FIXTURE=$(python manage.py shell --verbosity 0 -c "
from django.contrib.auth import get_user_model
from api.models import Course, Tag

User = get_user_model()
is_empty = not User.objects.filter(username='admin').exists() and not Tag.objects.exists() and not Course.objects.exists()
print('1' if is_empty else '0')
")
	CAN_LOAD_FIXTURE=$(echo "$CAN_LOAD_FIXTURE" | tr -d '\r\n')
	if [ "$CAN_LOAD_FIXTURE" = "1" ]; then
		echo "Loading fixture: api/fixtures/initial_data.json"
		python manage.py loaddata api/fixtures/initial_data.json
	fi
fi

exec python manage.py runserver 0.0.0.0:8000
