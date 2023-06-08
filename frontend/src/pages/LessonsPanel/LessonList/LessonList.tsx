import React from 'react';
import { clsx } from 'clsx';
import css from './LessonList.module.css';
import { useStore } from 'src/data/store/useStore';
import { Lesson } from 'src/data/lessons/sections';
import readyLesson from './../../../static/readyLesson.svg';
import notReadyLesson from './../../../static/notReadyLesson.svg';
import { sections } from 'src/data/lessons/sections';

interface IRightPanelLayout {
  sectionTitle: string;
  lessons: Lesson[];
  selectedLesson?: number;
  sectionsAmount: number;
  //   handlePrevSection?: () => void;
  //   handleNextSection?: () => void;1
  handleSelectLesson?: () => void;
}

export const LessonList: React.FC<IRightPanelLayout> = ({
  sectionTitle,
  lessons,
  selectedLesson,
  sectionsAmount,
  //   handlePrevSection,
  //   handleNextSection,
  handleSelectLesson,
}) => {
  const {
    currentSection,
    nextSection,
    currentLesson,
    nextLesson,
    doneLessons,
    setCurrentLesson,
    setCurrentSection,
    setNextSection,
    setNextLesson,
  } = useStore();

  const [localCurrentSection, setLocalCurrentSection] =
    React.useState(currentSection);

  console.log(
    'currentSection: ',
    currentSection,
    'currentLesson: ',
    currentLesson,
    'sectionTitle: ',
    sectionTitle,
    ' lessons: ',
    lessons,
    'sectionsAmount: ',
    sectionsAmount,
    'nextLesson: ',
    nextLesson,
    'nextSection: ',
    nextSection,
  );

  const handlePrevSection = () => {
    if (localCurrentSection !== 0) {
      //   setCurrentSection(currentSection - 1);
      setLocalCurrentSection(localCurrentSection - 1);
    }
  };

  const handleNextSection = () => {
    if (localCurrentSection + 1 < sections.length) {
      //   setCurrentSection(currentSection + 1);
      setLocalCurrentSection(localCurrentSection + 1);
    }
  };

  const isThatLessonComesAfterDone = (id: number) => {
    return doneLessons.includes(id - 1);
  };

  const handleLessonClick = (id: number, lessonType: string, idx: number) => {
    // if (lessonType === 'test' || id <= currentLesson) {
    if (
      lessonType === 'test' ||
      isThatLessonComesAfterDone(id) ||
      id <= currentLesson
    ) {
      //   setCurrentSection(localCurrentSection);
      setNextSection(localCurrentSection);
      setNextLesson(idx);
    }
  };

  return (
    <div className={css.main}>
      <div className={css.wrapper}>
        <h1 className={css.title}>{sections[localCurrentSection].title}</h1>
        <div className={css.lessons}>
          {sections[localCurrentSection].content.map(
            (lesson: Lesson, index: number) => (
              <div
                className={css.lesson}
                onClick={() =>
                  handleLessonClick(lesson.id, lesson.lessonType, index)
                }
              >
                {doneLessons.includes(lesson.id) ? (
                  <img src={readyLesson} alt="ready lesson" />
                ) : (
                  <img src={notReadyLesson} alt="not ready lesson" />
                )}
                <div
                  className={
                    lesson.lessonType === 'test' ||
                    isThatLessonComesAfterDone(lesson.id) ||
                    lesson.id <= currentLesson
                      ? css['lesson-title']
                      : clsx(css['lesson-title'], css['lesson-title-inactive'])
                  }
                >
                  {lesson.sectionTitle}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
      <div className={css.buttons}>
        <button
          onClick={handlePrevSection}
          className={
            localCurrentSection !== 0
              ? clsx(css.button, css['active-button'])
              : clsx(css.button, css['disabled-button'])
          }
        >
          Предыдущий раздел
        </button>
        <button
          onClick={handleNextSection}
          className={
            localCurrentSection + 1 < sectionsAmount
              ? clsx(css.button, css['active-button'])
              : clsx(css.button, css['disabled-button'])
          }
        >
          Следующий раздел
        </button>
      </div>
    </div>
  );
};
