# Регламент интеграции frontend-чата

## 1. Назначение

Этот документ описывает обязательный контракт frontend-приложения с анонимным чат-сервисом на Django Sessions.

- Аутентификация отсутствует.
- Единственный идентификатор пользователя: cookie `sessionid` от Django.
- Нельзя использовать JWT, `localStorage` для идентификации или передавать `user_id` в запросах.

## 2. Обязательный сценарий инициализации

При первом открытии страницы frontend обязан вызвать:

```http
POST /api/chat/init/
```

Требования к запросу:

- `credentials: "include"` обязателен.
- Тело запроса не требуется.
- Ответ сохраняет `sessionid` и `csrftoken` в cookies браузера.

Ожидаемый ответ:

```json
{
  "id": "0d43d87b-bdef-44bf-ae8c-86ca1a95829a",
  "messages": [
    {
      "id": 1,
      "text": "Здравствуйте",
      "sender_type": "operator",
      "created_at": "2026-03-13T12:30:00Z"
    }
  ]
}
```

После успешного `init` frontend должен:

1. Сохранить `id` чат-сессии только в runtime state приложения.
2. Отрисовать `messages`.
3. Открыть WebSocket на `/ws/chat/`.

## 3. Получение истории сообщений

Для принудительной синхронизации использовать:

```http
GET /api/chat/messages/
```

Правила:

- Обязательно `credentials: "include"`.
- Использовать после reconnect, чтобы добрать сообщения, пропущенные во время разрыва WebSocket.
- Не пытаться фильтровать сообщения по `user_id`: backend уже привязывает историю к `sessionid`.

## 4. Отправка сообщений

Есть два допустимых канала отправки.

### 4.1. Основной realtime-канал

Если WebSocket открыт, отправлять событие:

```json
{
  "type": "message",
  "text": "Привет"
}
```

Преимущества:

- меньше HTTP-запросов;
- сообщение сразу попадает в группу `chat_<session_key>`;
- все открытые вкладки одной session получают апдейт одновременно.

### 4.2. Fallback через REST

Если WebSocket временно недоступен, использовать:

```http
POST /api/chat/messages/
```

Правила:

- `credentials: "include"` обязателен;
- обязательно передавать `X-CSRFToken` из cookie `csrftoken`;
- тело запроса:

```json
{
  "text": "Привет"
}
```

Ответ содержит созданное сообщение. UI должен уметь дедуплицировать сообщения по `id`, потому что то же сообщение может прийти по WebSocket.

## 5. Подключение к WebSocket

Адрес подключения:

```text
ws://<host>/ws/chat/
```

или

```text
wss://<host>/ws/chat/
```

Правила:

- WebSocket открывать только после успешного `POST /api/chat/init/`.
- Браузер сам приложит cookie `sessionid`, если websocket идёт на тот же backend-origin.
- Нельзя пытаться передавать `session_key` в query string.

Поддерживаемые входящие события:

```json
{ "type": "chat.ready", "chat_session_id": "..." }
```

```json
{
  "type": "chat.message",
  "message": {
    "id": 12,
    "text": "Ответ оператора",
    "sender_type": "operator",
    "created_at": "2026-03-13T12:35:10Z"
  }
}
```

```json
{
  "type": "chat.error",
  "code": "rate_limited",
  "detail": "Too many messages. Please wait before sending another one.",
  "wait_seconds": 18
}
```

## 6. Правила переподключения

Frontend обязан реализовать reconnect.

Минимальный алгоритм:

1. При `close` не удалять локальную историю сообщений.
2. Попробовать переподключение с задержкой 2-3 секунды.
3. Ограничить число подряд попыток.
4. После успешного reconnect вызвать `GET /api/chat/messages/` и смержить историю по `id`.
5. Если reconnect не удался, показать пользователю fallback-режим и отправлять через REST.

## 7. Работа с cookie-based session

Обязательные правила:

- Все HTTP-запросы чата отправлять с `credentials: "include"`.
- Не читать и не использовать `sessionid` в JavaScript как идентификатор пользователя.
- Использовать только cookie `csrftoken` для заголовка `X-CSRFToken`.
- Не хранить сессионные идентификаторы в `localStorage`, `sessionStorage` или URL.

## 8. Ошибки, которые нужно учитывать

- `400`: пустой текст, невалидный payload, превышение длины сообщения.
- `403`: отсутствует или неверен `X-CSRFToken`.
- `429`: превышен rate limit на отправку сообщений.
- `chat.error/session_missing`: WebSocket открыт до `POST /api/chat/init/`.
- `chat.error/validation_error`: сервер отверг текст сообщения.
- `chat.error/rate_limited`: сервер временно ограничил отправку.

## 9. Минимальная реализация в проекте

В репозитории добавлены готовые примерные файлы:

- `src/lib/chat.ts`
- `src/components/ui/ChatWidget/ChatWidget.tsx`
- `src/components/ui/ChatWidget/ChatWidget.module.scss`

Пример встраивания:

```tsx
import { ChatWidget } from "@/components/ui/ChatWidget/ChatWidget";

export default function SupportPage() {
  return <ChatWidget />;
}
```

## 10. Минимальный standalone-пример

```tsx
"use client";

import { useEffect, useState } from "react";
import {
  buildChatWebSocketUrl,
  getChatMessages,
  initChatSession,
  sendChatMessage,
} from "@/lib/chat";

export function MinimalChat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    let socket: WebSocket | null = null;

    const start = async () => {
      const init = await initChatSession();
      setMessages(init.messages);

      socket = new WebSocket(buildChatWebSocketUrl());
      socket.onmessage = async (event) => {
        const payload = JSON.parse(event.data);

        if (payload.type === "chat.message") {
          setMessages((current) => {
            const exists = current.some((item) => item.id === payload.message.id);
            return exists ? current : [...current, payload.message];
          });
        }

        if (payload.type === "chat.error") {
          console.error(payload);
        }
      };
    };

    void start();

    return () => socket?.close();
  }, []);

  const handleSend = async () => {
    if (!text.trim()) {
      return;
    }

    const created = await sendChatMessage(text);
    setMessages((current) =>
      current.some((item) => item.id === created.id) ? current : [...current, created],
    );
    setText("");
  };

  return (
    <div>
      <div>
        {messages.map((message) => (
          <div key={message.id}>{message.text}</div>
        ))}
      </div>
      <textarea value={text} onChange={(event) => setText(event.target.value)} />
      <button type="button" onClick={handleSend}>
        Отправить
      </button>
    </div>
  );
}
```

## 11. Что frontend-разработчику запрещено

- Передавать `user_id`, `session_key` или токен в теле запроса.
- Подменять `credentials: "include"` на `same-origin` для cross-origin SPA.
- Игнорировать CSRF при REST `POST`.
- Полагаться только на WebSocket без REST-sync после reconnect.
- Подключать сторонние чат-библиотеки для базовой интеграции.