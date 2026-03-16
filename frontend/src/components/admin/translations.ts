import type { Lang } from "@/lib/translations";

type Translation = Record<string, Record<string, string | Record<string, string>>>;

const translations: Record<Lang, Translation> = {
  en: {
    courseTypes: {
      hybrid: "Hybrid",
      online: "Online",
      offline: "Offline",
    },
    audience: {
      adults: "Adults",
      kids: "Kids",
    },
    eventTypes: {
      online: "Online",
      offline: "Offline",
      hybrid: "Hybrid",
    },
    resources: {
      tags: {
        title: "Tags",
        description: "Create and edit bilingual tags.",
      },
      courses: {
        title: "Courses",
        description: "Full course management including media, pricing and tags.",
      },
      events: {
        title: "Events",
        description: "Create and update event schedule and visuals.",
      },
      posts: {
        title: "Posts",
        description: "Manage blog posts and links to tags.",
      },
      consultations: {
        title: "Consultations",
        description: "Read-only incoming consultation requests.",
      },
      "event-requests": {
        title: "Event Requests",
        description: "Read-only incoming event requests.",
      },
      orders: {
        title: "Orders",
        description: "Read-only payment order data.",
      },
    },
    fieldLabels: {
      id: "ID",
      name: "Name",
      "name_en": "Name (EN)",
      "name_bg": "Name (BG)",
      slug: "Slug",
      "title_en": "Title (EN)",
      "title_bg": "Title (BG)",
      type: "Type",
      price: "Price",
      "is_active": "Active",
      start: "Start Date",
      audience: "Audience",
      "monthly_installment_price": "Monthly Installment",
      "visits_per_week": "Visits / week",
      "stripe_product_id": "Stripe Product ID",
      "stripe_price_id": "Stripe Price ID",
      tags: "Tags",
      "description_en": "Description (EN)",
      "description_bg": "Description (BG)",
      "duration_en": "Duration (EN)",
      "duration_bg": "Duration (BG)",
      "about_title_en": "About Title (EN)",
      "about_title_bg": "About Title (BG)",
      "about_description_top_en": "About Top (EN)",
      "about_description_top_bg": "About Top (BG)",
      "about_description_bottom_en": "About Bottom (EN)",
      "about_description_bottom_bg": "About Bottom (BG)",
      image: "Main Image",
      "about_image": "About Image",
      "audience_image": "Audience Image",
      date: "Date",
      "image_2": "Image 2",
      author: "Author",
      "content_en": "Content (EN)",
      "content_bg": "Content (BG)",
      picture: "Picture",
      "created_at": "Created",
      "updated_at": "Updated",
      "paid_at": "Paid At",
      email: "Email",
      phone: "Phone",
      interested: "Interested",
      status: "Paid",
      "total_amount": "Total Amount",
      "stripe_payment_intent_id": "Stripe Payment Intent",
      "stripe_checkout_session_id": "Stripe Checkout Session",
    },
    buttons: {
      save: "Save",
      create: "Create",
      update: "Update",
      delete: "Delete",
      cancel: "Cancel",
      refresh: "Refresh",
      reload: "Reload",
      "new-record": "New Record",
      "archive-session": "Archive Session",
      "activate-session": "Activate Session",
      "send-reply": "Send Reply",
      sending: "Sending...",
      saving: "Saving...",
      deleting: "Deleting...",
    },
    placeholders: {
      message: "Message",
      "tag-ids": "Tag IDs: 1,2,3",
    },
    messages: {
      "no-messages-yet": "No messages yet",
      "no-messages-in-session": "No messages in this session yet.",
      "select-dialog": "Select a dialog.",
      "loading-sessions": "Loading sessions...",
      active: "active",
      archived: "archived",
      "course-type": "Course Type",
    },
    ui: {
      "operator-chat": "Operator Chat",
      main: "Main",
    },
  },
  bg: {
    courseTypes: {
      hybrid: "Хибриден",
      online: "Онлайн",
      offline: "Лично",
    },
    audience: {
      adults: "Възрастни",
      kids: "Деца",
    },
    eventTypes: {
      online: "Онлайн",
      offline: "Лично",
      hybrid: "Хибриден",
    },
    resources: {
      tags: {
        title: "Етикети",
        description: "Създавайте и редактирайте двуезични етикети.",
      },
      courses: {
        title: "Курсове",
        description: "Пълно управление на курсове, включително медии, цени и етикети.",
      },
      events: {
        title: "События",
        description: "Създавайте и актуализирайте график и визуали на събития.",
      },
      posts: {
        title: "Публикации",
        description: "Управление на блог публикации и връзки към етикети.",
      },
      consultations: {
        title: "Консултации",
        description: "Четене на входящи заявки за консултация.",
      },
      "event-requests": {
        title: "Заявки за събития",
        description: "Четене на входящи заявки за събития.",
      },
      orders: {
        title: "Поръчки",
        description: "Четене на данни за плащане.",
      },
    },
    fieldLabels: {
      id: "ID",
      name: "Име",
      "name_en": "Име (EN)",
      "name_bg": "Име (BG)",
      slug: "Slug",
      "title_en": "Заглавие (EN)",
      "title_bg": "Заглавие (BG)",
      type: "Тип",
      price: "Цена",
      "is_active": "Активен",
      start: "Начална дата",
      audience: "Аудитория",
      "monthly_installment_price": "Месечна вноска",
      "visits_per_week": "Посещения / седмица",
      "stripe_product_id": "Stripe Product ID",
      "stripe_price_id": "Stripe Price ID",
      tags: "Етикети",
      "description_en": "Описание (EN)",
      "description_bg": "Описание (BG)",
      "duration_en": "Продължителност (EN)",
      "duration_bg": "Продължителност (BG)",
      "about_title_en": "Заглавие За (EN)",
      "about_title_bg": "Заглавие За (BG)",
      "about_description_top_en": "За Горе (EN)",
      "about_description_top_bg": "За Горе (BG)",
      "about_description_bottom_en": "За Долу (EN)",
      "about_description_bottom_bg": "За Долу (BG)",
      image: "Основно изображение",
      "about_image": "Изображение За",
      "audience_image": "Изображение на аудиторията",
      date: "Дата",
      "image_2": "Изображение 2",
      author: "Автор",
      "content_en": "Съдържание (EN)",
      "content_bg": "Съдържание (BG)",
      picture: "Картина",
      "created_at": "Създадено",
      "updated_at": "Актуализирано",
      "paid_at": "Платено в",
      email: "Имейл",
      phone: "Телефон",
      interested: "Интересуван",
      status: "Платено",
      "total_amount": "Обща сума",
      "stripe_payment_intent_id": "Stripe Payment Intent",
      "stripe_checkout_session_id": "Stripe Checkout Session",
    },
    buttons: {
      save: "Запази",
      create: "Създай",
      update: "Обновяване",
      delete: "Изтриване",
      cancel: "Отмяна",
      refresh: "Опресняване",
      reload: "Преново зареждане",
      "new-record": "Нов запис",
      "archive-session": "Архивирай сесия",
      "activate-session": "Активирай сесия",
      "send-reply": "Изпрати отговор",
      sending: "Изпращане...",
      saving: "Запазване...",
      deleting: "Изтриване...",
    },
    placeholders: {
      message: "Съобщение",
      "tag-ids": "Tag IDs: 1,2,3",
    },
    messages: {
      "no-messages-yet": "Няма съобщения",
      "no-messages-in-session": "Няма съобщения в тази сесия.",
      "select-dialog": "Изберете диалог.",
      "loading-sessions": "Зареждане на сесии...",
      active: "активна",
      archived: "архивирана",
      "course-type": "Тип курс",
    },
    ui: {
      "operator-chat": "Оператор чат",
      main: "Основно",
    },
  },
};

export const getAdminTranslation = (lang: Lang, key: string, subKey?: string): string => {
  const section = translations[lang];
  if (!section) return key;

  const keys = key.split(".");
  let current: any = section;

  for (const k of keys) {
    if (current && typeof current === "object" && k in current) {
      current = current[k];
    } else {
      return key;
    }
  }

  if (subKey && typeof current === "object" && subKey in current) {
    return current[subKey];
  }

  return typeof current === "string" ? current : key;
};
