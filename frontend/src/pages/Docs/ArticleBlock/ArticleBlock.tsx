import React from 'react';
import clsx from 'clsx';
import { Link, Route, useLocation } from 'wouter';

import css from './ArticleBlock.module.css';

interface IArticleBlock {
  articleTitle: string;
  timeOfRead: string;
  internalLink?: string;
  externalLink?: string;
  isTheory?: boolean;
  isPractice?: boolean;
  isImportant?: boolean;
  isExternal?: boolean;
}

export const ArticleBlock: React.FC<IArticleBlock> = ({
  articleTitle,
  timeOfRead,
  isTheory,
  isPractice,
  isImportant,
  isExternal,
  externalLink,
  internalLink = '',
}) => {
  const ArticleContent = () => (
    <div className={css.main}>
      <div className={css.tags}>
        {isTheory && <p className={clsx(css.tag, css.theory)}>Теория</p>}
        {isPractice && <p className={clsx(css.tag, css.practice)}>Практика</p>}
        {isImportant && (
          <p className={clsx(css.tag, css.important)}>Важно знать</p>
        )}
        {isExternal && (
          <p className={clsx(css.tag, css['external-resource'])}>
            Внешний ресурс
          </p>
        )}
      </div>
      <p className={css.title}>{articleTitle}</p>
      <p className={css['time-of-read']}>Время чтения: {timeOfRead}</p>
    </div>
  );

  return (
    <>
      {internalLink !== '' ? (
        <Link href={internalLink}>
          <a href={internalLink} className={css.link}>
            <ArticleContent />
          </a>
        </Link>
      ) : (
        <a
          href={externalLink}
          target="_blank"
          rel="noreferrer"
          className={css.link}
        >
          <ArticleContent />
        </a>
      )}
    </>
  );
};
