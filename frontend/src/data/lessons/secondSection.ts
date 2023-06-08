import { Lesson } from './sections';

export const secondSection: Lesson[] = [
  {
    id: 4,
    sectionTitle: 'Урок 1. Навигация по директориям',
    lessonTitle: '1. Навигация по директориям и просмотр содержимого',
    lessonType: 'lesson',
    lessonStructure: [
      {
        description: 'Данная команда отображает содержимое текущей директории',
        task: 'Просмотрите содержимое директории',
        command: 'ls',
      },
      {
        description: 'Команда cd отвечает за навигация по директориям.',
        task: 'Перейдите в домашнюю директорию',
        command: 'cd home',
      },
      {
        description:
          'Отличная работа! А теперь давайте поднимемся обратно в директорию на уровень выше',
        task: 'Поднимитесь в директорию вверх на один уровень.',
        command: 'cd ..',
      },
      {
        description: 'Вы справились! Скорее переходите ко второму уроку!',
        task: '',
        command: '',
      },
    ],
    lessonPlan: [
      'Просмотр содержимого каталога',
      'Переход в домашнюю директорию',
      'Переход в родительскую директорию',
    ],
  },
  {
    id: 5,
    sectionTitle: 'Урок 2. Создание и удаление файлов и директорий',
    lessonTitle: '2. Информация о системе',
    lessonType: 'lesson',
    lessonStructure: [
      {
        description: 'Команда mkdir отвечает за создание нового каталога.',
        task: 'Создайте новый каталог с именем test',
        // command: 'echo -e "Linux \\bis \\ban \\boperating \\bsystem"',
        command: 'mkdir test',
      },
      {
        description: 'Навигацию по каталогам мы уже освоили, поэтому закрепим.',
        task: 'Перейдите в созданный каталог test',
        // command: 'echo -e "Linux \\bis \\ban \\boperating \\bsystem"',
        command: 'cd test',
      },
      {
        description:
          'Также важно знать, что можно создавать несколько каталогов одного уровня',
        task: 'Создайте несколько каталогов test',
        command: 'mkdir test1 test2 test3',
      },
      {
        description: 'Давайте убедимся, что директории созданы',
        task: 'Выполните команду отображения содержимого директории',
        command: 'ls',
      },
      {
        description:
          'Хорошо, а теперь удалим одну из созданных директорий! Для этого нужно использовать команду rm с ключом -r (recursive), который произведет рекурсивное удаление директории',
        task: 'Удалите директорию test1',
        command: 'rm -r test1',
      },
      {
        description: 'Класс! Вы справились!',
        task: '',
        command: '',
      },
    ],
    lessonPlan: [
      'Создание каталога',
      'Переход в каталог',
      'Создание нескольких каталогов',
      'Вывод содержимого',
      'Удаление каталога',
    ],
  },
  {
    id: 6,
    sectionTitle: 'Урок 3. Абсолютные и относительные пути',
    lessonTitle: '3. Дата и время',
    lessonType: 'lesson',
    lessonStructure: [
      {
        description:
          'date - позволяет получить текущую дату и время в стандартном формате.',
        task: 'Выполните команду',
        command: 'date',
      },
      {
        description:
          'Отлично, рассмотрим команду cal. Данная команда осуществляет вывод календаря в терминале. При вводе команды без опций вам отобразиться текущий месяц.',
        task: 'Выполните команду',
        // command: 'echo -e "Linux \\bis \\ban \\boperating \\bsystem"',
        command: 'cal',
      },
      {
        description:
          'Рассмотрим полезную опцию -m, которая позволяет отобразить конкретный месяц определенного года.',
        task: 'Выведите в терминал май 2023 года.',
        // command: 'echo -e "Linux \\nis \\nan \\noperating \\nsystem"',
        command: 'cal -m 5 2023',
      },
      {
        description:
          'А если ввести команду с номером нужного года, то напечатаются все месяцы.',
        task: 'Выведите календарь за 2023 год.',
        // command: 'echo -e "Linux \\nis \\nan \\noperating \\nsystem"',
        command: 'cal 2023',
      },
      {
        description:
          'Класс! Третий урок тоже освоен, дальше будет только интереснее!',
        task: '',
        command: '',
      },
    ],
    lessonPlan: [
      'Изучить команду date',
      'Изучить команду сal',
      'Познакомиться с опцией -m',
      'Команда сal и вывод всего года',
    ],
  },
  // {
  //   id: 7,
  //   sectionTitle: 'Финальный тест по разделу 2',
  //   lessonTitle: 'Тест по разделу 2',
  //   lessonType: 'test',
  //   lessonStructure: [
  //     {
  //       description: 'Вопрос 1 – создание каталога',
  //       task: 'Выполните команду для создания каталога с именем lebash',
  //       command: 'mkdir dir',
  //     },
  //     {
  //       description: 'Вопрос 2 – просмотр содержимого каталога',
  //       task: 'Выполните команду отображения содержимого каталога',
  //       command: 'ls',
  //     },
  //     {
  //       description: 'Вопрос 3 – переход в ранее созданный каталог',
  //       task: 'Выполните команду перехода в каталог lebash',
  //       command: 'cd lebash',
  //     },
  //     {
  //       description: 'Вопрос 4 – создание нескольких каталогов',
  //       task: 'Создайте три каталога одного уровня с именами test1 test2 test3',
  //       command: 'mkdir test1 test2 test3',
  //     },
  //     {
  //       description: 'Вопрос 5 – удаление каталога',
  //       task: 'Удалите каталог test2',
  //       command: 'rm -r test2',
  //     },
  //     {
  //       description: 'Отлинчо! Тест готов, дальше будет только интереснее!',
  //       task: '',
  //       command: '',
  //     },
  //   ],
  //   lessonPlan: [
  //     'Изучить команду mkdir',
  //     'Изучить команду ls',
  //     'Изучить команду cd',
  //     'Создание нескольких каталогов',
  //     'Удаление каталога',
  //   ],
  // },
];

// Это уже кстати на вторую главу тянет, хоть и не большую, осталось еще подумать
// как реализовать тест по первой главе, сперва наверное в дизайне и концепции
// Если будут тесты, то добавить их прохождение в варианты использования, аналогично
// с лендингом, просмотр лендинга это же тоже своего рода вариант использования

// Второй раздел (Навигация по системе):
// 1 навигация и просмотр 2 создание и удаление директорий и файлов
// 1 урок про использование ls mkdir cd в стандартном виде, а также удаление директории и файла, разница и значение ключа -r
// 2 урок – рассказ про разницу относительных и абсолютных путей
// 3 урок – создание вложенных и смежных директорий

// echo -e "Linux \bopen \bsource \bsoftware \btechnologies"
// Раскрашивание текста можно добавить из этого урока в какой-то из уроков: https://losst.pro/komanda-echo-v-linux
// echo -e "\033[35mLinux \033[34mopen \033[32msource \033[33msoftware \033[31mtechnologies\033[0m"
