import React from 'react';
import { Header } from '../Landing/Header';
import css from './About.module.css';

export const About = () => {
  return (
    <div className={css.main}>
      <div className={css['main-wrapper']}>
        <Header />
        <h1 className={css['article-title']}>
          LeBash создан, чтобы помочь в освоении Bash и Unix команд
        </h1>

        <div className={css['info-block--wrapper']}>
          <div className={css['info-block']}>
            <p className={css['info-block--number']}>1</p>
            <p className={css['info-block--text']}>
              Интерактивные уроки с подсказками и проработанной структурой
            </p>
          </div>
          <div className={css['info-block']}>
            <p className={css['info-block--number']}>2</p>
            <p className={css['info-block--text']}>
              Тестирование по пройденным разделам
            </p>
          </div>
          <div className={css['info-block']}>
            <p className={css['info-block--number']}>3</p>
            <p className={css['info-block--text']}>
              Можно просмотреть результаты тестов или пройти их заново
            </p>
          </div>
          <div className={css['info-block']}>
            <p className={css['info-block--number']}>4</p>
            <p className={css['info-block--text']}>
              Документация с подробными статьями и функцией SplitBash
            </p>
          </div>
          <div className={css['info-block']}>
            <p className={css['info-block--number']}>5</p>
            <p className={css['info-block--text']}>
              Кабинет со статистикой пользователя
            </p>
          </div>
        </div>
        {/* <CtaContent />
        <Button /> */}
      </div>
    </div>
  );
};
