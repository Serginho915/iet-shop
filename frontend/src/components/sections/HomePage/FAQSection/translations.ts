import type { Lang } from "@/lib/LanguageContext";


export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export type FAQTranslations = {
  faqs: FAQ[];
};

export type FAQTitleTranslations = {
  title: string;
}

export const translationsTitle: Record<Lang, FAQTitleTranslations & { reminderTitle: string, reminderText: string }> = {
  en: {
    title: "Any Questions?",
    reminderTitle: "Glad You Asked!",
    reminderText: "If there's still something you want to check, don't hesitate to give us a shout!"
  },
  bg: {
    title: "Имате ли въпроси?",
    reminderTitle: "Радваме се, че попитахте!",
    reminderText: "Ако все още има нещо, което искате да проверите, не се колебайте да ни се обадите!"
  }
}

export const translations: Record<Lang, FAQTranslations> = {
  en: {
    faqs: [
      {
        id: "1",
        question: "Do I need prior knowledge to enroll?",
        answer: "Most of our entry-level courses are designed for complete beginners. If a selected program requires specific skills, it will be clearly stated in its description.",
      },
      {
        id: "2",
        question: "Are there age restrictions?",
        answer: "The IT sector is open to everyone with a desire to grow. We offer specialized programs for children and students, as well as professional courses for adults looking to change careers or upgrade their skills.",
      },
      {
        id: "3",
        question: "What is the training format?",
        answer: "We offer maximum flexibility. Our trainings are conducted online, with the possibility of recording every session so that all materials can be reviewed.",
      },
      {
        id: "4",
        question: "How often are the classes held?",
        answer: "Usually, classes are held 2 or 3 times a week, during non-working hours (evenings) or on weekends, so you can combine training with work or school.",
      },
      {
        id: "5",
        question: "Will I have practical tasks?",
        answer: "Yes! Our philosophy is learning through practice. Over 70% of the time is dedicated to practical exercises, working on real cases, and developing personal projects for your portfolio.",
      }
    ]
  },
  bg: {
    faqs: [
      {
        id: "1",
        question: "Трябва ли да имам предварителни познания, за да се запиша?",
        answer: "Повечето от нашите начални курсове са проектирани за напълно начинаещи. Ако избраната програма изисква специфични умения, това ще бъде ясно посочено в описанието ѝ.",
      },
      {
        id: "2",
        question: "Има ли възрастови ограничения?",
        answer: "ИТ секторът е отворен за всеки с желание за развитие. Предлагаме специализирани програми за деца и ученици, както и професионални курсове за възрастни, които искат да сменят кариерата си или да надградят уменията си.",
      },
      {
        id: "3",
        question: "Какъв е форматът на обучение?",
        answer: "Предлагаме максимална гъвкавост. Обученията ни се провеждат онлайн, с възможност за запис на всяко едно занятие, за да може да се прави преглед на всички материали.",
      },
      {
        id: "4",
        question: "Колко често се провеждат занятията?",
        answer: "Обикновено занятията са 2 или 3 пъти седмично, в извънработно време (вечерни часове) или през уикенда, за да можете да съчетавате обучението с работа или училище.",
      },
      {
        id: "5",
        question: "Ще имам ли практически задачи?",
        answer: "Да! Нашата философия е учене чрез практика. Над 70% от времето е посветено на практически упражнения, работа по реални казуси и разработване на лични проекти за вашето портфолио.",
      }
    ]
  }
};
