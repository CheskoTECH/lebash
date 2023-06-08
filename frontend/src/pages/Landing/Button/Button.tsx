import React from 'react';
import { Link } from 'wouter';
import css from './Button.module.css';
import { useLocation } from 'wouter';
import { DURATION } from 'src/components/Loaders/loaderParams';

export const Button = () => {
  const [location, setLocation] = useLocation();

  const navigateToLesson = () => {
    setLocation('/lesson-loader');
    setTimeout(() => {
      setLocation('/lesson');
    }, DURATION);
  };

  return (
    // <Link href="/lesson" className={css.link}>
    <button className={css.button} onClick={() => navigateToLesson()}>
      Начать урок
    </button>
    // </Link>
  );
};
