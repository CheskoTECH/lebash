import React from 'react';
import css from './CtaContent.module.css';
import coder from '../../../static/coder.png';

export const CtaContent = () => {
  return (
    <div className={css.main}>
      <div className={css['left-side']}>
        <h1 className={css.title}>Bash Scripting с нуля</h1>
        <div className={css['tag-wrapper']}>
          <p className={css.tag}>35+ заданий</p>
          <p className={css.tag}>Интерактивная среда</p>
          <p className={css.tag}>Практика на реальном Alpine Linux</p>
        </div>
      </div>
      <img src={coder} alt="programmer" className={css.image} />
    </div>
  );
};
