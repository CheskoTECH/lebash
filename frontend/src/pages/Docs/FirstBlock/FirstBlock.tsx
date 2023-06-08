import React from 'react';
import clsx from 'clsx';
import css from './FirstBlock.module.css';
import { Link, Route, useLocation } from 'wouter';

export const FirstBlock = () => {
  const [location, setLocation] = useLocation();

  const handleGoToAboutPage = () => {
    setLocation('/about');
  };

  const handleGoToLessonsPage = () => {
    setLocation('/about-lessons');
  };

  return (
    <div className={css.main}>
      <div className={clsx(css.base, css.cta)}>
        LeBash Дока — это документация по Bash для разработчиков на понятном
        языке. Её пишет небольшое сообщество, чтобы помогать друг другу.
      </div>
      <div className={css['block-wrapper']}>
        <div
          className={clsx(css.base, css.block)}
          onClick={handleGoToAboutPage}
        >
          О проекте
        </div>
        <div
          className={clsx(css.base, css.block)}
          onClick={handleGoToLessonsPage}
        >
          Уроки
        </div>
      </div>
    </div>
  );
};
