import React from 'react';
import { Button } from './Button/Button';
import { CtaContent } from './CtaContent/CtaContent';
import { Header } from './Header/Header';
import css from './Landing.module.css';

export const Landing = () => {
  return (
    <div className={css.main}>
      <div className={css['main-wrapper']}>
        <Header />
        <CtaContent />
        <Button />
      </div>
    </div>
  );
};
