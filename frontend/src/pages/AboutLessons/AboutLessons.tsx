import React from 'react';
import { Header } from '../Landing/Header';
import css from './AboutLesson.module.css';

export const AboutLessons = () => {
  return (
    <div className={css.main}>
      <div className={css['main-wrapper']}>
        <Header />
        {/* <h1 className={css['article-title']}>
          Уроки разработаны на основе практик курса «Операционные системы
          семейства Unix/Linux»
        </h1> */}
        <p className={css['article-subtitle']}>
          Уроки разработаны на основе практик курса «Операционные системы
          семейства Unix/Linux»
        </p>
        <p className={css['article-subtitle']}>О курсе</p>
        <p className={css['article-text']}>
          Целью курса является изучение базовых понятий и терминов в области
          администрирования операционных систем семейства Linux/Unix, и основных
          команд и утилит, а также приобретение навыков разработки
          автоматизированных средств администрирования операционных систем
          Linux/Unix.
        </p>

        <p className={css['article-subtitle']}>Разделы с уроками в LeBash</p>

        <div className={css['info-block--wrapper']}>
          <div className={css['info-block']}>
            <p className={css['info-block--number']}>1</p>
            <div className={css['info-block--text']}>
              <p className={css['info-block--text-lesson']}>
                Урок 1. Команда echo
              </p>
              <p className={css['info-block--text-lesson']}>
                Урок 2. Информация о системе
              </p>
              <p className={css['info-block--text-lesson']}>
                Урок 3. Дата и время
              </p>
              <p className={css['info-block--text-lesson']}>
                Финальный тест по разделу 1
              </p>
            </div>
          </div>
          <div className={css['info-block']}>
            <p className={css['info-block--number']}>2</p>
            <div className={css['info-block--text']}>
              <p className={css['info-block--text-lesson']}>
                Урок 1. Навигация по директориям
              </p>
              <p className={css['info-block--text-lesson']}>
                Урок 2. Создание и удаление файлов и директорий
              </p>
              <p className={css['info-block--text-lesson']}>
                Урок 3. Виды путей в системе
              </p>
              <p className={css['info-block--text-lesson']}>
                Финальный тест по разделу 2
              </p>
            </div>
          </div>
        </div>
        {/* <CtaContent />
          <Button /> */}
      </div>
    </div>
  );
};
