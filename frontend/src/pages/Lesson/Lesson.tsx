import React from 'react';
import css from './Lesson.module.css';

import { Term } from '../../components/Terminal/Terminal';
import { RightPanelLayout } from 'src/components/RightPanelLayout/RightPanelLayout';
import { useStore } from 'src/data/store/useStore';

import { firstSection } from '../../data/lessons/firstSection';

import { sections } from 'src/data/lessons/sections';

import { useLocation } from 'wouter';
import { DURATION } from 'src/components/Loaders/loaderParams';

export const Lesson = () => {
  const {
    lessonInfo,
    commands,
    currentLesson,
    nextLesson,
    currentSection,
    nextSection,
    setCurrentLesson,
    setDoneLessons,
    setNextLesson,
    setCommands,
    dropCommands,
  } = useStore();

  // console.log(
  //   'Lesson: ',
  //   lessonInfo,
  //   'commands: ',
  //   commands,
  //   'currentSection: ',
  //   currentSection,
  //   'currentLesson: ',
  //   currentLesson,
  //   'currentSection: ',
  //   currentSection,
  // );

  const [lessonPart, setLessonPart] = React.useState(0);

  const [tasksDone, setTasksDone] = React.useState(0);

  const [isTest, setIsTest] = React.useState(
    sections[nextSection].content[nextLesson].lessonType === 'test',
  );

  // console.log('isTest: ', isTest);

  const currentSectionContentLength = sections[nextSection].content.length;
  console.log('currentSectionContentLength: ', currentSectionContentLength);
  // console.log('currrrrr: ', currentSectionContentLength);

  const [isCurrentLessonDone, setIsCurrentLessonDone] = React.useState(false);
  const isLessonDoneRef = React.useRef(false);

  const [location, setLocation] = useLocation();
  // console.log('LENGTH: ', firstSection[currentLesson].lessonStructure.length);

  React.useEffect(() => {
    if (
      commands.includes(
        sections[nextSection].content[nextLesson].lessonStructure[lessonPart]
          .command,
      ) &&
      !isCurrentLessonDone
    ) {
      // console.log('CALL1');
      setLessonPart(lessonPart + 1);
      setTasksDone(tasksDone + 1);
    }

    // console.log(
    //   'lessonPart: ',
    //   lessonPart,
    //   'len : ',
    //   sections[nextSection].content[nextLesson].lessonStructure.length,
    //   'nextLesson: ',
    //   nextLesson,
    // );

    if (
      lessonPart ===
        sections[nextSection].content[nextLesson].lessonStructure.length - 1 &&
      !isLessonDoneRef.current
    ) {
      // console.log('CALL2');
      // console.log(
      //   'change current lesson',
      //   'isCurrentLessonDone 1: ',
      //   isLessonDoneRef.current,
      // );
      setIsCurrentLessonDone(true);
      isLessonDoneRef.current = true;
      // console.log(
      //   'change current lesson',
      //   'isCurrentLessonDone 2: ',
      //   isLessonDoneRef.current,
      // );
      setCurrentLesson(currentLesson + 1);
      setDoneLessons(sections[nextSection].content[nextLesson].id);
    }
  }, [
    commands,
    currentLesson,
    nextSection,
    isCurrentLessonDone,
    lessonPart,
    nextLesson,
    setCurrentLesson,
    setDoneLessons,
    tasksDone,
  ]);

  const handleNextLessonClick = () => {
    if (isCurrentLessonDone) {
      if (nextLesson + 1 < sections[nextSection].content.length) {
        // setCurrentLesson(currentLesson + 1);
        // console.log('CALL3');
        setNextLesson(nextLesson + 1);

        setLessonPart(0);
        setTasksDone(0);
        setIsCurrentLessonDone(false);
        isLessonDoneRef.current = false;

        dropCommands();

        if (currentSectionContentLength - 2 === nextLesson) {
          setLocation('/lesson-loader');
          setTimeout(() => {
            setLocation('/test');
          }, 2000);
        } else {
          setLocation('/lesson-loader');
          setTimeout(() => {
            setLocation('/lesson');
          }, DURATION);
        }

        // setLocation('/lesson-loader');
        // setTimeout(() => {
        //   setLocation('/lesson');
        //   // TODO: Готовим урок сделать переход с анимацией
        //   // Готовим тест сделать переход на страницу с прикольной анимацией
        //   //  При этом перед тестом кнопка начать тест должна быть

        //   // И просто при переходе на урок из главной
        //   // И статистики ставить лоадер
        // }, DURATION);
        // console.log('click');
      }
    } else {
      // console.log('not click');
    }
  };

  // TODO: добавить зависимость от прогресса (т.е. на сервере определеять выполнено задание или нет)
  // TODO: сделать набор статей со страницей Docs, на которой будут обрабатываться и отображаться статьи
  // происходить это будет путем создания отдельной директории с JSON файлом внутри,
  // эти JSON'ы из директории будут обрабатывать и подаваться в соответствующие разделы в зависимости от принадлежности
  // для админа потом сделать редактор статей, раз там есть JSON, возможность просматривать контейнеры

  return (
    <div className={css.main}>
      <div className={css['left-side']}>
        <Term />
      </div>
      <div className={css['right-side']}>
        <RightPanelLayout
          contentTitle={sections[nextSection].content[nextLesson].sectionTitle}
          // contentText={<LessonContent />}
          contentText={
            sections[nextSection].content[nextLesson].lessonStructure[
              lessonPart
            ].description
          }
          isSeparateLine
          termHintText={
            sections[nextSection].content[nextLesson].lessonStructure[
              lessonPart
            ].command
          }
          taskText={
            sections[nextSection].content[nextLesson].lessonStructure[
              lessonPart
            ].task
          }
          planList={sections[nextSection].content[nextLesson].lessonPlan}
          tasksDone={tasksDone}
          isCurrentLessonDone={isCurrentLessonDone}
          isShowProfileData={false}
          handleNextButtonClick={handleNextLessonClick}
          isTopSeparateLine
          isLessonPanel={!isTest}
          planTitle="План занятия:"
          isTestPanel={isTest}
          buttonTitle={
            currentSectionContentLength - 2 === nextLesson
              ? 'Начать тест по разделу'
              : 'Следующий урок'
          }
          // testAnswer={}
        />
      </div>
    </div>
  );
};

// const LessonContent: React.FC = () => {
//   return (
//     <p>
//       Команда echo - это простая, но в то же время часто используемая встроенная
//       команда оболочки Bash. <br></br>Она имеет только одно назначение -
//       выводить строку текста в терминал, но применяется очень часто в различных
//       скриптах, программах, и даже для редактирования конфигурационных файлов.
//     </p>
//   );
// };
