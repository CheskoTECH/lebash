import React from 'react';
import css from './StatBlock.module.css';

interface IStatBlock {
  statBlockTitle: string;
  numberText?: string;
  smallText?: string;
}

export const StatBlock: React.FC<IStatBlock> = ({
  statBlockTitle,
  numberText,
  smallText,
}) => (
  <div className={css.main}>
    <p className={css.statTitle}>{statBlockTitle}</p>
    <p className={css.numberText}>{numberText}</p>
  </div>
);
