import React from 'react';
import css from './Header.module.css';
import logo from '../../../static/logo.svg';
import { Link, Route, useLocation } from 'wouter';

export const Header = () => {
  const [location, setLocation] = useLocation();

  const handleGoToMainPage = () => {
    setLocation('/');
  };

  return (
    <div className={css.main}>
      <img
        src={logo}
        alt="logo"
        onClick={handleGoToMainPage}
        className={css.logo}
      />
      <div className={css['links-wrapper']}>
        <Link href="/about" className={css.link}>
          О проекте
        </Link>
        <Link href="/about-lessons" className={css.link}>
          Уроки
        </Link>
        <Link href="/docs" className={css.link}>
          Дока
        </Link>
      </div>
      <Link href="/panel">
        <button className={css.button}>Кабинет</button>
      </Link>
    </div>
  );
};
