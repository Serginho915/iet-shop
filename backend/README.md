### Backend (Django + DRF)

REST API сервис на базе Django и Django REST Framework. Поддерживает OpenAPI-документацию и запуск через Docker.

Стек
- Python 3.12
- Django DRF
- Django Channels
- Redis channel layer
- DRF-spectacular
- Docker

Локальный запуск
```
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
docker run --name iet-shop-redis -p 6379:6379 redis:7-alpine
python manage.py migrate
python manage.py runserver
```

API: http://127.0.0.1:8000/

WebSocket чат: ws://127.0.0.1:8000/ws/chat/

Анонимный чат
- `POST /api/chat/init/` создаёт Django session, `ChatSession` и возвращает историю.
- `GET /api/chat/messages/` возвращает историю текущей session-based чат-сессии.
- `POST /api/chat/messages/` отправляет сообщение от анонимного пользователя.
- Для realtime необходим Redis и ASGI-приложение `core.asgi:application`.

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