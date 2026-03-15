export interface ChatMessage {
  id: number;
  text: string;
  sender_type: "user" | "operator" | "bot";
  created_at: string;
}

export interface ChatInitResponse {
  id: string;
  messages: ChatMessage[];
}

export type ChatSocketEvent =
  | { type: "chat.ready"; chat_session_id: string }
  | { type: "chat.message"; message: ChatMessage }
  | {
      type: "chat.error";
      code: string;
      detail: string | Record<string, string[]>;
      wait_seconds?: number;
    };

const getApiBaseUrl = () => {
  const configuredBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
  if (configuredBase) {
    return configuredBase;
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  throw new Error("NEXT_PUBLIC_API_URL is required on the server.");
};

const getCookie = (name: string) => {
  if (typeof document === "undefined") {
    return "";
  }

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1]) : "";
};

const buildApiUrl = (path: string) => `${getApiBaseUrl()}${path}`;

const extractErrorDetail = async (response: Response) => {
  const payload = await response.json().catch(() => null);

  if (!payload) {
    return `Request failed with status ${response.status}.`;
  }

  if (typeof payload.detail === "string") {
    return payload.detail;
  }

  if (Array.isArray(payload.detail)) {
    return payload.detail.join(" ");
  }

  if (payload.text) {
    return Array.isArray(payload.text) ? payload.text.join(" ") : String(payload.text);
  }

  return `Request failed with status ${response.status}.`;
};

export async function initChatSession(): Promise<ChatInitResponse> {
  const response = await fetch(buildApiUrl("/api/chat/init/"), {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(await extractErrorDetail(response));
  }

  return response.json();
}

export async function getChatMessages(): Promise<ChatMessage[]> {
  const response = await fetch(buildApiUrl("/api/chat/messages/"), {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await extractErrorDetail(response));
  }

  return response.json();
}

export async function sendChatMessage(text: string): Promise<ChatMessage> {
  const csrfToken = getCookie("csrftoken");

  if (!csrfToken) {
    throw new Error("CSRF token is missing. Initialize chat before sending messages.");
  }

  const response = await fetch(buildApiUrl("/api/chat/messages/"), {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(await extractErrorDetail(response));
  }

  return response.json();
}

export function buildChatWebSocketUrl(): string {
  const apiBaseUrl = getApiBaseUrl();

  if (apiBaseUrl.startsWith("https://")) {
    return `wss://${apiBaseUrl.slice("https://".length)}/ws/chat/`;
  }

  if (apiBaseUrl.startsWith("http://")) {
    return `ws://${apiBaseUrl.slice("http://".length)}/ws/chat/`;
  }

  if (typeof window === "undefined") {
    throw new Error("Cannot infer websocket origin on the server.");
  }

  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  return `${protocol}://${window.location.host}/ws/chat/`;
}