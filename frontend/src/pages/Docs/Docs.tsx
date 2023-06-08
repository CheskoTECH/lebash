import React from 'react';
import { ArticleBlock } from './ArticleBlock';

import css from './Docs.module.css';
import { FirstBlock } from './FirstBlock';
import { Header } from './Header';

export const Docs = () => {
  return (
    <div className={css.main}>
      <div className={css.wrapper}>
        <Header />
        <div className={css['section-wrapper']}>
          <div className={css['flex-wrapper']}>
            <FirstBlock />
            <ArticleBlock
              articleTitle="Что такое bash / shell"
              timeOfRead="8 минут"
              isExternal
              externalLink="https://habr.com/ru/amp/publications/548078/"
              // internalLink="/docs/what-is-bash"
            />
            <ArticleBlock
              articleTitle="Создание и удаление файлов через консоль пользователя"
              timeOfRead="15 минут"
              isTheory
              isPractice
              isImportant
              // internalLink="/docs/create-and-remove"
              internalLink="/docs/what-is-bash"
            />
            <ArticleBlock
              articleTitle="Оболочка Bash — шпаргалка для начинающих"
              timeOfRead="12 минут"
              isExternal
              externalLink="https://tproger.ru/translations/bash-cheatsheet/"
              // internalLink="/docs/bash-base"
            />
          </div>
          <div className={css['flex-wrapper']}>
            <p className={css['section-title']}>Bash-скрипты</p>
            <ArticleBlock
              articleTitle="Bash-скрипты: начало"
              timeOfRead="11 минут"
              isExternal
              externalLink="https://habr.com/ru/companies/ruvds/articles/325522/"
            />
            <ArticleBlock
              articleTitle="Bash-скрипты, часть 2: циклы"
              timeOfRead="8 минут"
              isExternal
              externalLink="https://habr.com/ru/companies/ruvds/articles/325928/"
            />
            <ArticleBlock
              articleTitle="Bash-скрипты, часть 3: параметры и ключи командной строки"
              timeOfRead="10 минут"
              isExternal
              externalLink="https://habr.com/ru/companies/ruvds/articles/326328/"
            />
            <ArticleBlock
              articleTitle="Bash-скрипты, часть 4: ввод и вывод"
              timeOfRead="9 минут"
              isExternal
              externalLink="https://habr.com/ru/companies/ruvds/articles/326594/"
            />
            <ArticleBlock
              articleTitle="Bash-скрипты, часть 5: сигналы, фоновые задачи, управление сценариями"
              timeOfRead="9 минут"
              isExternal
              externalLink="https://habr.com/ru/companies/ruvds/articles/326826/"
            />
            <ArticleBlock
              articleTitle="Bash-скрипты, часть 6: функции и разработка библиотек"
              timeOfRead="9 минут"
              isExternal
              externalLink="https://habr.com/ru/companies/ruvds/articles/327248/"
            />
            <ArticleBlock
              articleTitle="Bash-скрипты, часть 7: sed и обработка текстов"
              timeOfRead="9 минут"
              isExternal
              externalLink="https://habr.com/ru/companies/ruvds/articles/327530/"
            />
            <ArticleBlock
              articleTitle="Bash-скрипты, часть 8: язык обработки данных awk"
              timeOfRead="14 минут"
              isExternal
              externalLink="https://habr.com/ru/companies/ruvds/articles/326328/"
            />
            <ArticleBlock
              articleTitle="Bash-скрипты, часть 9: регулярные выражения"
              timeOfRead="15 минут"
              isExternal
              externalLink="https://habr.com/ru/companies/ruvds/articles/327896/"
            />
            <ArticleBlock
              articleTitle="Bash-скрипты, часть 10: практические примеры"
              timeOfRead="9 минут"
              isExternal
              externalLink="https://habr.com/ru/companies/ruvds/articles/328346/"
            />
            <ArticleBlock
              articleTitle="Bash-скрипты, часть 11: expect и автоматизация интерактивных утилит"
              timeOfRead="9 минут"
              isExternal
              externalLink="https://habr.com/ru/companies/ruvds/articles/328436/"
            />
          </div>
        </div>
      </div>
      <div className={css.footer}>
        <p className={css['footer-text']}>LeBash © 2023</p>
      </div>
    </div>
  );
};
