import React, { FC } from 'react';
import css from './App.module.css';
import { Lesson } from '../pages/Lesson';
import { Test } from '../pages/Test';
import { Landing } from '../pages/Landing/Landing';
import { LessonPanel } from '../pages/LessonsPanel/LessonPanel';
import { LessonLoader } from 'src/components/Loaders/LessonLoader';
import { TestLoader } from 'src/components/Loaders/TestLoader';
import { Link, Route, Router } from 'wouter';
import { Docs } from 'src/pages/Docs';
import { WhatIsBashArticle } from 'src/pages/Docs/Articles/WhatIsBashArticle';
import { About } from 'src/pages/About';
import { AboutLessons } from 'src/pages/AboutLessons';

export const App: FC = () => {
  // console.log('hello');

  return (
    <div className={css.main}>
      {/* <Lesson />; */}
      {/* <Link href="/">
        <a>Landing</a>
      </Link>
      <Link href="/panel">
        <a>Panel</a>
      </Link>
      <Link href="/lesson">
        <a>Lesson</a>
      </Link> */}

      <Route path="/" component={Landing} />
      <Route path="/docs" component={Docs} />
      <Route path="/about" component={About} />
      <Route path="/about-lessons" component={AboutLessons} />
      <Route path="/panel" component={LessonPanel} />
      <Route path="/lesson" component={Lesson} />
      <Route path="/test" component={Test} />
      <Route path="/lesson-loader" component={LessonLoader} />
      <Route path="/test-loader" component={TestLoader} />
      <Route path="/docs/what-is-bash" component={WhatIsBashArticle} />
    </div>
  );
  // return <div className={css.main}>hello</div>;
};
