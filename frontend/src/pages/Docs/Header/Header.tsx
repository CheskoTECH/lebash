import React from 'react';
import docs from '../../../static/docs.svg';
import { Link, useLocation } from 'wouter';

import css from './Header.module.css';

export const Header = () => {
  const [location, setLocation] = useLocation();

  const handleClickOnLogo = () => {
    setLocation('/');
  };

  return (
    <div className={css.main}>
      <img
        src={docs}
        alt="logo"
        className={css.logo}
        onClick={() => handleClickOnLogo()}
      />
      <div className={css['links-wrapper']}>
        <Link href="/" className={css.link}>
          Главная
        </Link>
        <Link href="/docs" className={css.link}>
          Дока
        </Link>
        <Link href="/panel" className={css.link}>
          Кабинет
        </Link>
      </div>
    </div>
  );
};
