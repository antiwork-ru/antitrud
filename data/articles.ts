export type Article = {
  title: string;
  source: string;
  type: "a" | "r" | "p" | "l";
  typeLabel: string;
  dateLabel: string;
  description: string;
  imageUrl: string;
  url: string;
  externalUrl?: string; // опционально
  slug: string;
};

export const articles: Article[] = [
  {
    title: "Всемирный обзор занятости и социальной сферы: обновление за сентябрь 2024",
    source: "МОТ",
    type: "r",
    typeLabel: "Доклад",
    dateLabel: "сент. 2024",
    description:
      "Анализ глобальных тенденций: доля трудовых доходов, занятость молодёжи и прогресс в достижении ЦУР к 2030 году.",
    imageUrl:
      "https://img1.teletype.in/files/85/0b/850ba7a8-9970-4e2d-9dfd-e04380879a6c.png",
    url: "https://teletype.in/@antitrud_ru/1GVSPy8OtS-",
    slug: "4day-iceland",
  },
  {
    title: "Большая ложь (с Эрин Пицци)",
    source: "TheTinMen",
    type: "p",
    typeLabel: "Подкаст",
    dateLabel: "нояб. 2024",
    description:
      "Гендерные причины домашнего насилия: разговор с Эрин Пицци – основательницей одного из первых приютов для жертв насилия.",
    imageUrl:
      "https://img1.teletype.in/files/08/d1/08d1b778-a43d-4db1-8e63-af7e3c89780f.png",
    url: "https://teletype.in/@antitrud_ru/the_big_lie",
    slug: "big-lie",
  },
  {
    title: "Письмо нашим согражданам Земли",
    source: "Открытое письмо",
    type: "l",
    typeLabel: "Письмо",
    dateLabel: "дек. 2024",
    description:
      "Обращение международных исследователей: экологический кризис, неравенство и призыв к коллективным действиям.",
    imageUrl:
      "https://img2.teletype.in/files/9f/d3/9fd38f69-958f-47f5-8128-995d3c06ebb3.png",
    url: "https://teletype.in/@antitrud_ru/AtyX84JUn1P",
    slug: "letter-to-citizens",
  },
  {
    title: "Научный прогресс замедляется?",
    source: "Оригинальная статья",
    type: "a",
    typeLabel: "Статья",
    dateLabel: "май 2024",
    description:
      "Почему наука при всём росте числа публикаций продвигается вперёд всё медленнее.",
    imageUrl:
      "https://img2.teletype.in/files/59/91/5991b2cb-8867-4a04-a311-fb84b0ac8d33.png",
    url: "https://teletype.in/@antitrud_ru/science",
    slug: "science",
  },
  {
    title: "Результаты внедрения 4-дневной рабочей недели в Исландии",
    source: "Оригинальная статья",
    type: "a",
    typeLabel: "Статья",
    dateLabel: "окт. 2024",
    description:
      "Данные и выводы крупнейшего эксперимента по сокращению рабочей недели.",
    imageUrl:
      "https://img2.teletype.in/files/18/c1/18c1b3eb-532c-4402-bdb1-652df0a675e4.png",
    url: "https://teletype.in/@antitrud_ru/4day_Iceland",
    slug: "4-day-week",
  },
];

