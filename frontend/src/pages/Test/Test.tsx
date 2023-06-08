import React from 'react';
import css from './Test.module.css';

import { Term } from '../../components/Terminal/Terminal';
import { RightPanelLayout } from 'src/components/RightPanelLayout/RightPanelLayout';
import { useStore } from 'src/data/store/useStore';

import { firstSection } from '../../data/lessons/firstSection';

import { sections } from 'src/data/lessons/sections';

import { useLocation } from 'wouter';
import { DURATION } from 'src/components/Loaders/loaderParams';

export const Test = () => {
  const {
    lessonInfo,
    commands,
    currentLesson,
    nextLesson,
    currentSection,
    testAnswers,
    nextSection,
    testQuestion,
    localTestAnswers,
    currentAnswer,
    setCurrentLesson,
    setDoneLessons,
    setCurrentSection,
    setNextLesson,
    removeTestAnswer,
    setTestAnswers,
    setCommands,
    dropCommands,
    setTestQuestion,
    setLocalTestAnswers,
    setCurrentAnswer,
  } = useStore();

  // // RESET
  // setCurrentAnswer('');
  // dropCommands();
  // // setLocalTestAnswers([]);
  // // setIsCurrentLessonDone(false);
  // // setTestQuestion(0);
  // // RESET END

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

  const [pageFirstLoadEnd, setPageFirstLoadEnd] =
    React.useState<boolean>(false);

  // const [testQuestion, setTestQuestion] = React.useState(0);

  // const [localTestAnswers, setLocalTestAnswers] = React.useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = React.useState<string[]>([]);

  // const [currentAnswer, setCurrentAnswer] = React.useState<string>('');

  // const [tasksDone, setTasksDone] = React.useState(0);

  const [isTest, setIsTest] = React.useState(
    sections[nextSection].content[nextLesson].lessonType === 'test',
  );

  console.log('isTest: ', isTest);

  const [isCurrentLessonDone, setIsCurrentLessonDone] = React.useState(false);
  const isLessonDoneRef = React.useRef(false);

  const [location, setLocation] = useLocation();

  const currentSectionAndLesson = sections[nextSection].content[nextLesson]; // точно ли так стоит через const
  // console.log('LENGTH: ', firstSection[currentLesson].lessonStructure.length);

  React.useEffect(() => {
    console.log('useEffect');

    console.log('testAnswers: ', testAnswers);
    // setDoneLessons(sections[nextSection].content[nextLesson].id);
    // currentSectionAndLesson.
    if (!pageFirstLoadEnd) {
      console.log('PAGE LOAD');

      let allCommands: string[] = [];
      currentSectionAndLesson.lessonStructure.forEach((lesson) => {
        console.log('COMMAND: ', lesson);
        allCommands.push(lesson.command);
      });
      console.log('allCommands: ', allCommands);
      setCorrectAnswers(allCommands);

      console.log('test answers: ', testAnswers, testAnswers.length);
      if (testAnswers.length >= 1) {
        let isLessonAllTasksCorrect = true;
        console.log('testAnswers');
        testAnswers.forEach((answer) => {
          if (answer.id === currentSectionAndLesson.id) {
            setIsCurrentLessonDone(true);
            setLocalTestAnswers(answer.answers);
          }
          setCurrentAnswer(testAnswers[0].answers[testQuestion]); // тут ли?

          console.log('answer: ', answer);

          answer.answers.forEach((answer, index) => {
            console.log('compare =>  ', allCommands[index], answer);
            if (allCommands[index] !== answer) {
              isLessonAllTasksCorrect = false;
            }
          });
        });
        console.log('isDONE: ', isCurrentLessonDone);
        if (isLessonAllTasksCorrect) {
          console.log('AALSLDLASKDAKS:');
          setDoneLessons(currentSectionAndLesson.id);
          // setCurrentSection();
        }
      }
      // testAnswers.
      // currentSectionAndLesson.id

      setPageFirstLoadEnd(true);

      console.log(
        'correctAnswers: ',
        correctAnswers,
        'userAnswers: ',
        localTestAnswers,
      );
    }

    if (commands[commands.length - 1] && !isCurrentLessonDone) {
      setCurrentAnswer(commands[commands.length - 1]);
    }
    console.log('command: ', commands, ' currentAnswer: ', currentAnswer);
    console.log('testAnswers: ', localTestAnswers);
  }, [commands]);

  const handleNextQuestionClick = () => {
    // console.log('следующий вопрос', 'testQuestion: ', testQuestion);
    // testQuestion
    if (
      testQuestion ===
        sections[nextSection].content[nextLesson].lessonStructure.length - 2 &&
      !isLessonDoneRef.current
    ) {
      // setLocalTestAnswers([...localTestAnswers, currentAnswer]);
      // setTestAnswers({
      //   id: currentSectionAndLesson.id,
      //   answers: localTestAnswers,
      // });
      setLocalTestAnswers([...localTestAnswers, currentAnswer]);
      setTestAnswers({
        id: currentSectionAndLesson.id,
        answers: [...localTestAnswers, currentAnswer],
      });
      setCurrentAnswer('');
      dropCommands();
      console.log('test is ready: ', localTestAnswers);

      setLocation('/test-loader'); // заменить на тест лоадер
      setTimeout(() => {
        setLocation('/test');
      }, DURATION);
    } else {
      console.log('следующий вопрос', 'testQuestion: ', testQuestion);
      setLocalTestAnswers([...localTestAnswers, currentAnswer]);
      // console.log('testAnswers: ', testAnswers);
      setCurrentAnswer('');
      setTestQuestion(testQuestion + 1);
      dropCommands(); // стоит ли?
      setLocation('/test-loader'); // заменить на тест лоадер
      setTimeout(() => {
        setLocation('/test');
      }, 800);
    }

    // TODO: если хоть один вопрос не верно, то не
    // помечать пройденным

    // if (isCurrentLessonDone) {
    //   if (nextLesson + 1 < sections[nextSection].content.length) {
    //     // setCurrentLesson(currentLesson + 1);
    //     console.log('CALL3');
    //     setNextLesson(nextLesson + 1);
    //     setLessonPart(0);
    //     setTasksDone(0);
    //     setIsCurrentLessonDone(false);
    //     isLessonDoneRef.current = false;
    //     dropCommands();
    //     setLocation('/lesson-loader');
    //     setTimeout(() => {
    //       setLocation('/lesson');
    //       // TODO: Готовим урок сделать переход с анимацией
    //       // Готовим тест сделать переход на страницу с прикольной анимацией
    //       //  При этом перед тестом кнопка начать тест должна быть
    //       // И просто при переходе на урок из главной
    //       // И статистики ставить лоадер
    //     }, DURATION);
    //     // console.log('click');
    //   }
    // } else {
    //   // console.log('not click');
    // }
  };

  const handleRestartButton = () => {
    setCurrentAnswer('');
    dropCommands();
    removeTestAnswer(currentSectionAndLesson.id);
    setLocalTestAnswers([]);
    setIsCurrentLessonDone(false);
    setTestQuestion(0);
  };

  const handleTestNumberItemClick = (id: number) => {
    setCurrentAnswer(localTestAnswers[id]);
    setTestQuestion(id);
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
              testQuestion
            ].description
          }
          isSeparateLine
          termHintText={
            sections[nextSection].content[nextLesson].lessonStructure[
              testQuestion
            ].command
          }
          taskText={
            sections[nextSection].content[nextLesson].lessonStructure[
              testQuestion
            ].task
          }
          planList={sections[nextSection].content[nextLesson].lessonPlan}
          // tasksDone={tasksDone}
          isCurrentLessonDone={isCurrentLessonDone}
          isShowProfileData={false}
          handleNextButtonClick={handleNextQuestionClick}
          isTopSeparateLine
          isLessonPanel={!isTest}
          planTitle={isTest ? 'Вопросы теста:' : 'План занятия:'}
          isTestPanel={isTest}
          testQuestion={testQuestion}
          currentAnswer={currentAnswer}
          handleTestNumberItemClick={handleTestNumberItemClick}
          handleTestRestartButton={handleRestartButton}
          correctAnswers={correctAnswers}
          userAnswers={localTestAnswers}
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
