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