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
pip install -r backend/requirements.txt
docker run --name iet-shop-redis -p 6379:6379 redis:7-alpine
cd backend
python manage.py migrate
python manage.py runserver
```

Stripe Checkout (test mode)
- Заполните корневой `.env` или используйте `.env.sample` как шаблон.
- Используйте только `sk_test_...` и `pk_test_...` ключи из Stripe Dashboard.
- Для локального checkout backend читает `STRIPE_SECRET_KEY` и `STRIPE_WEBHOOK_SECRET` из корневого `.env`.
- `price_id` задается у каждого курса отдельно через админку в полe `stripe_price_id`.
- Пути возврата в Stripe заданы в коде как относительные: `/success` и `/cancel`.
- Тестовая карта Stripe: `4242 4242 4242 4242`, любая будущая дата, любой CVC, любой ZIP.

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