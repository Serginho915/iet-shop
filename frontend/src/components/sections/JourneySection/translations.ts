import type { Lang } from "@/lib/translations";

type JourneyTranslations = {
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
    descriptionHighlight: string;
};

export const translations: Record<Lang, JourneyTranslations> = {
    en: {
        titlePrefix: "",
        titleHighlight: "700+",
        titleSuffix: " students already joined us",
        description: "Welcome to our family. Become member of our community, get new proffession, earn, develop and ",
        descriptionHighlight: "help each other!"
    },
    bg: {
        titlePrefix: "",
        titleHighlight: "700+",
        titleSuffix: " студенти вече се присъединиха",
        description: "Добре дошли в нашето семейство. Станете член на нашата общност, вземете нова професія, печелете, развивайте се и си ",
        descriptionHighlight: "помагайте един на друг!"
    }
};
