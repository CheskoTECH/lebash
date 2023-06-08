import React from 'react';
import { RightPanelLayout } from 'src/components/RightPanelLayout/RightPanelLayout';
import { Link, Route } from 'wouter';
import { useStore } from 'src/data/store/useStore';
import css from './LessonPanel.module.css';
import { StatBlock } from './StatBlock';
import { LessonList } from './LessonList';
import { sections } from 'src/data/lessons/sections';
import { Lesson } from 'src/data/lessons/sections';
import TextTransition, { presets } from 'react-text-transition';

const NextLessonTitleWithNextLabel = ({
  lessonTitle,
}: {
  lessonTitle?: string;
}) => (
  <span className={css['next-tag__wrapper']}>
    <span className={css['next-tag']}>дальше</span>
    <span>{lessonTitle}</span>
  </span>
);

export const LessonPanel = () => {
  const {
    currentSection,
    currentLesson,
    nextLesson,
    doneLessons,
    nextSection,
    setCurrentLesson,
    setCurrentSection,
  } = useStore();

  const [tasksAmount, setTasksAmount] = React.useState(0);
  const [lessonsAmount, setLessonsAmount] = React.useState(0);
  const [doneLessonsAmount, setDoneLessonsAmount] = React.useState(0);
  const [doneSections, setDoneSections] = React.useState(0);
  //   const [tasksAmount, setTasksAmount] = React.useState(0);
  const [sectionsAmount, setSectionsAmount] = React.useState(sections.length);
  const [progress, setProgress] = React.useState(0);
  //   const [sectionsAmount, setSectionsAmount] = React.useState(0);

  React.useEffect(() => {
    console.log(
      'sections: ',
      sections,
      'doneLessons: ',
      doneLessons,
      'nextSection: ',
      nextSection,
    );

    let lessons = 0;
    let readyLessons = 0;
    let tasks = 0;
    sections.forEach((section) => {
      //   console.log(section.content.length);
      tasks += section.content.length; // -1 т.к. по одному тесту в разделе
      //   setTasksAmount(tasksAmount + section.content.length);
      let isSectionDone = true;

      section.content.forEach((lesson) => {
        if (lesson.lessonType !== 'test') {
          lessons += lesson.lessonStructure.length - 1;
          if (doneLessons.includes(lesson.id)) {
            readyLessons += lesson.lessonStructure.length - 1;
          }
        }
        // console.log('lesson: ', lesson);
        console.log(
          'doneLESSONS: ',
          doneLessons,
          'lesson.id: ',
          lesson.id,
          '!doneLessons.includes(lesson.id): ',
          !doneLessons.includes(lesson.id),
        );
        if (!doneLessons.includes(lesson.id)) {
          isSectionDone = false;
          console.log('isSectionDone: ', isSectionDone);
        }
      });

      if (isSectionDone) {
        console.log('!!!!!!!!!lesson: ', section);
        setDoneSections(doneSections + 1);
      }
    });
    setTasksAmount(tasks);
    setLessonsAmount(lessons);
    setDoneLessonsAmount(readyLessons);
  }, [doneLessons]);

  const handleButtonClick = () => {
    console.log('click!');
  };

  return (
    <div className={css.main}>
      <LessonList
        sectionTitle={sections[currentSection].title}
        lessons={sections[currentSection].content}
        sectionsAmount={sections.length}
      />
      <RightPanelLayout
        isShowProfileData
        contentTitle="Добро пожаловать в LeBash!"
        className={css.panel}
        isShowLogout
        isStatPanel
        buttonTitle={`Начать – ${sections[nextSection].content[nextLesson]?.sectionTitle}`}
        // buttonTitle={`Начать – ${
        //   sections[nextSection].content.find(
        //     (lesson) => lesson.id === nextLesson,
        //   )?.sectionTitle
        // }`}
        handleNextButtonClick={handleButtonClick}
        isSeparateLine
        planTitle={
          <NextLessonTitleWithNextLabel
            lessonTitle={
              sections[nextSection].content[nextLesson]?.sectionTitle
            }
            // lessonTitle={
            //   sections[nextSection].content.find(
            //     (lesson) => lesson.id === nextLesson,
            //   )?.sectionTitle
            // }
          />
        }
        planList={sections[nextSection]?.content[nextLesson]?.lessonPlan?.slice(
          0,
          3,
        )}
        content={
          <div className={css.statBlocks}>
            <StatBlock
              statBlockTitle="Пройдено разделов"
              numberText={`${doneSections}/${sectionsAmount}`}
            />
            <StatBlock
              statBlockTitle="Решено тестов и уроков"
              // statBlockTitle="Решено уроков"
              numberText={`${
                Array.from(new Set(doneLessons)).length
              }/${tasksAmount}`}
            />
            <StatBlock
              statBlockTitle="Пройдено заданий"
              numberText={`${doneLessonsAmount}/${lessonsAmount}`}
              // не учитывать тесты
            />
            <StatBlock
              statBlockTitle="Оценка прогресса"
              numberText={`${Math.round(
                (doneLessonsAmount * 100) / lessonsAmount,
              )}%`}
            />
          </div>
        }
      />
    </div>
  );
};
