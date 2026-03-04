### Backend (Django + DRF)

REST API сервис на базе Django и Django REST Framework. Поддерживает OpenAPI-документацию и запуск через Docker.

Стек
- Python 3.12
- Django DRF
- DRF-spectacular
- Docker

Локальный запуск
```
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

API: http://127.0.0.1:8000/

Загрузка тестовых данных (fixtures)
```
cd backend
python manage.py loaddata api/fixtures/initial_data.json
```

Если нужно загрузить fixture «с нуля»:
```
cd backend
python manage.py flush --no-input
python manage.py migrate
python manage.py loaddata api/fixtures/initial_data.json
```