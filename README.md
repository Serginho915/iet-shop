### Deployment (Docker)

Проект запускается из корня через Docker Compose.

#### Запуск (dev)
``` bash
docker compose -f docker-compose.dev.yml up --build
```

Перед запуском заполните корневой `.env` на основе `.env.sample`.
Для Stripe используйте только test keys: `sk_test_...` и `pk_test_...`.
`price_id` хранится у конкретного курса в админке, а не в `.env`.

Backend: 
http://localhost:8000

Документация API:
http://localhost:8000/api/docs/

Фронтенд:
http://localhost:3000

Dev superuser в fixture:
- username: `admin`
- password: `admin`
- загрузка: `python manage.py loaddata api/fixtures/initial_data.json`

Stripe test checkout
- Checkout session endpoint: `POST /api/create-checkout-session/`
- Webhook endpoint: `POST /api/stripe/webhook/`
- Страница оплаты: `http://localhost:3000/bg/checkout/fullstack-essentials`
- Return URLs формируются backend из относительных путей `/success` и `/cancel`
- Тестовая карта: `4242 4242 4242 4242`

В dev-режиме при каждом старте backend-контейнера данные БД очищаются (`flush`) и вся fixture загружается автоматически.

#### Остановка
``` bash
docker compose -f docker-compose.dev.yml down
```

#### Запуск на VPS (prod, сборка локально из проекта)
```bash
docker compose -f docker-compose.prod.yml up -d --build
```

#### Остановка на VPS (prod)
```bash
docker compose -f docker-compose.prod.yml down
```
