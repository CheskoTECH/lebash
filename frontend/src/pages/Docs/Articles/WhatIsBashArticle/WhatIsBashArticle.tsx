import React from 'react';
import { Header } from '../../Header';
import clsx from 'clsx';
import { useLocation } from 'wouter';

import css from './WhatIsBashArticle.module.css';
import { Term } from 'src/components/Terminal/Terminal';

export const WhatIsBashArticle = () => {
  const [isSplitBash, setIsSplitBash] = React.useState(false);

  const [location, setLocation] = useLocation();

  const handleBack = () => {
    setLocation('/docs');
  };

  // className={isTestPanel ? css.contentTest : css.content}

  return (
    <div className={isSplitBash ? css['main-split'] : css.main}>
      {isSplitBash && (
        <div className={css['term-wrapper']}>
          <div className={css.term}>
            <Term />
          </div>
        </div>
      )}
      <div className={css['scroll-wrapper']}>
        <div className={isSplitBash ? css['split-wrapper'] : css.wrapper}>
          <Header />
          <p className={css['back-button']} onClick={() => handleBack()}>
            Назад
          </p>
          <h1 className={css['article-title']}>
            Создание и удаление файлов через консоль
          </h1>
          <div className={css['article-info-wrapper']}>
            <p className={css['article-info-text']}>Время чтения: 14 минут</p>
            <div className={css.tags}>
              <p className={clsx(css.tag, css.theory)}>Теория</p>
              <p className={clsx(css.tag, css.practice)}>Практика</p>
            </div>
          </div>
          <p className={css['article-subtitle']}>Кратко</p>
          <p className={css['article-text']}>
            Создание, изменение и удаление файлов через консоль. Предназначение
            команды touch в Linux — изменение временной метки (время изменения и
            время использования). Но если введенного имени файла утилита не
            найдет, она автоматически создаст новый.
          </p>

          <p className={css['article-subtitle']}>Утилита touch</p>
          <p className={css['article-text']}>
            Создание, изменение и удаление файлов через консоль. Предназначение
            команды touch в Linux — изменение временной метки (время изменения и
            время использования). Но если введенного имени файла утилита не
            найдет, она автоматически создаст новый.
          </p>
          <p className={css['article-text']}>
            Перед созданием нового файла просмотрим содержимое текущей
            директории:
          </p>
          <p className={css['article-listing']}># ls</p>
          <p className={css['article-text']}>
            Итак, для создания файла необходимо прописать в командной строке:
          </p>
          <p className={css['article-listing']}># touch new.txt</p>
          <p className={css['article-listing']}># ls</p>
          <p className={css['article-text']}>
            Таким образом, мы видим, что был создан файл с нужным именем и
            расширением.
          </p>

          <p className={css['article-subtitle']}>Перенаправление процесса</p>
          <p className={css['article-text']}>
            Этот способ можно считать самым простым. Чтобы создать файл с его
            помощью, необходимо всего лишь указать знак перенаправления и ввести
            имя создаваемого файла:
          </p>
          <p className={css['article-listing']}># &gt; «Имя_Файла»</p>

          <p className={css['article-subtitle']}>Утилита cp</p>
          <p className={css['article-text']}>
            Как и в случае с утилитой touch, главным предназначением команды cp
            не является создание новых файлов. Она необходима для копирования.
            Однако задав переменную «null», вы создадите новый документ:
          </p>
          <p className={css['article-listing']}># cp /dev/null «Имя_Файла»</p>

          <p className={css['article-subtitle']}>
            Удаление файлов через «Терминал»
          </p>
          <p className={css['article-text']}>
            Удаление файлов в «Терминале» практически ничем не отличается от их
            создания. Главное — знать все необходимые команды.
          </p>
          <p className={css['article-subtitle']}>Команда rm</p>
          <p className={css['article-text']}>
            Именно команда rm служит в Linux для удаления файлов. Вам
            всего-навсего нужно указать директорию, ввести команду и вписать имя
            файла, который нужно удалить:
          </p>
          <p className={css['article-listing']}># rm «Имя_Файла»</p>

          <p className={css['article-source']}>
            Источник: https://lumpics.ru/how-create-or-delete-file-in-linux/
          </p>
          <div
            className={css['split-bash--button']}
            onClick={() => setIsSplitBash(!isSplitBash)}
          >
            <p>SplitBash</p>
          </div>
          {/* <div className={css.footer}>
            <p className={css['footer-text']}>LeBash © 2023</p>
          </div> */}
        </div>
      </div>
      {/* {!isSplitBash && (
        <div className={css.footer}>
          <p className={css['footer-text']}>LeBash © 2023</p>
        </div>
      )} */}
    </div>
  );
};
