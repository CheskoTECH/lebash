import React from 'react';
import css from './RightPanelLayout.module.css';
import { clsx } from 'clsx';
import TextTransition, { presets } from 'react-text-transition';
import { RightPanelButton } from './Blocks/Button/RightPanelButton';
import { ButtonSize, ButtonState } from './Blocks/Button/RightPanelButton';
import { Link, useLocation } from 'wouter';
import { AvatarAndLogout } from './Blocks/AvatarAndLogout/AvatarAndLogout';
import { DURATION } from '../Loaders/loaderParams';
import { useStore } from 'src/data/store/useStore';
// import {
//   Transition,
//   TransitionGroup,
//   CSSTransition,
//   SwitchTransition,
// } from 'react-transition-group';

interface IRightPanelLayout {
  children?: React.ReactNode;
  contentTitle: string;
  contentText?: string;
  content?: React.ReactNode;
  planList?: string[];
  planTitle?: string | React.ReactNode;
  isSeparateLine?: boolean;
  taskText?: string;
  termHintText?: string;
  tasksDone?: number;
  futureSectionContent?: React.ReactNode;
  buttons?: React.ReactNode;
  isCurrentLessonDone?: boolean;
  isShowProfileData?: boolean;
  handleNextButtonClick?: () => void;
  handleTestRestartButton?: () => void;
  handleTestNumberItemClick?: (id: number) => void;
  isTopSeparateLine?: boolean;
  isShowLogout?: boolean;
  className?: string;
  isLessonPanel?: boolean;
  isStatPanel?: boolean;
  isTestPanel?: boolean;
  buttonTitle?: string;
  testQuestion?: number;
  currentAnswer?: string;
  correctAnswers?: string[];
  userAnswers?: string[];
}

export const RightPanelLayout: React.FC<IRightPanelLayout> = ({
  contentTitle,
  contentText,
  content,
  termHintText,
  taskText,
  isSeparateLine = false,
  isShowLogout = false,
  isTopSeparateLine,
  planList,
  planTitle,
  tasksDone = 0,
  futureSectionContent,
  isCurrentLessonDone,
  isShowProfileData,
  handleNextButtonClick,
  handleTestRestartButton,
  handleTestNumberItemClick,
  className = '',
  isLessonPanel,
  isStatPanel,
  isTestPanel,
  buttonTitle,
  buttons,
  testQuestion = 0,
  currentAnswer = '',
  correctAnswers,
  userAnswers,
}) => {
  // const numberOfPlanItem =
  // console.log('isCurrentLessonDone: ', isCurrentLessonDone);
  const [location, setLocation] = useLocation();

  const { dropCommands, setCurrentAnswer } = useStore();

  const navigateToLesson = (buttonTitle: string | undefined) => {
    // // RESET
    // setCurrentAnswer('');
    // dropCommands();
    // // setLocalTestAnswers([]);
    // // setIsCurrentLessonDone(false);
    // // setTestQuestion(0);
    // // RESET END

    if (!buttonTitle?.includes('тест')) {
      setLocation('/lesson-loader');
      setTimeout(() => {
        setLocation('/lesson');
      }, DURATION);
    } else {
      setLocation('/lesson-loader');
      setTimeout(() => {
        setLocation('/test');
      }, 2000);
    }
  };

  // console.log('content: ', content);

  return (
    <div className={clsx(css.main, className)}>
      <div>
        {isShowProfileData && <AvatarAndLogout isShowLogout={isShowLogout} />}
        <div className={isTestPanel ? css.contentTest : css.content}>
          <p className={css.contentTitle}>{contentTitle}</p>
          {isTopSeparateLine && <div className={css.line}></div>}
          {contentText && (
            <div className={css.contentText}>
              <TextTransition springConfig={presets.stiff} direction="down">
                {contentText}
              </TextTransition>
            </div>
          )}
          <>{isStatPanel && content}</>
          {taskText && (
            <div className={css.taskTitle}>
              <span className={css.grayText}>Ваша задача:</span>
              <br />
              {/* {'-> '} */}
              <TextTransition springConfig={presets.stiff} direction="down">
                {taskText}
              </TextTransition>
            </div>
          )}
          {isTestPanel && (
            <>
              <p className={css.contentTextLowMargin}>Ваш ответ:</p>
              <div className={css.termHint2}># {currentAnswer}</div>
            </>
          )}

          {isTestPanel && isCurrentLessonDone && (
            <>
              <p className={css.contentTextLowMargin}>Правильный ответ:</p>
              <div className={css.termHint}># {termHintText}</div>
            </>
          )}
          {!isTestPanel && termHintText && (
            <div className={css.termHint}># {termHintText}</div>
          )}
        </div>
        {isSeparateLine && planList ? <div className={css.line}></div> : null}
        {planList && !isTestPanel && (
          <div className={css.lessonPlan}>
            <p className={css.planTitle}>{planTitle}</p>
            {planList.map((task, index) => (
              <div className={css.planItem} key={index}>
                <div
                  className={
                    index + 1 <= tasksDone
                      ? clsx(css.planNumberWrapper, css.green)
                      : clsx(css.planNumberWrapper, css.gray)
                  }
                >
                  <span className={css.planNumber}>{index + 1}</span>
                </div>
                <span
                  className={
                    index === tasksDone && !isStatPanel
                      ? css.underlined
                      : undefined
                  }
                >
                  {task}
                </span>
              </div>
            ))}
          </div>
        )}
        {planList && isTestPanel && !isCurrentLessonDone && (
          <div>
            <p className={css.planTitle}>{planTitle}</p>
            <div className={css['test-questions']}>
              {planList.map((question, index) => (
                <p
                  className={
                    index < testQuestion
                      ? clsx(css['test-question'], css['test-question-done'])
                      : index === testQuestion
                      ? clsx(css['test-question'], css['test-question-current'])
                      : clsx(css['test-question'], css['test-question-active'])
                  }
                >
                  {index + 1}
                </p>
              ))}
            </div>
          </div>
        )}
        {planList &&
          isTestPanel &&
          isCurrentLessonDone &&
          handleTestNumberItemClick &&
          correctAnswers &&
          userAnswers && (
            <div>
              <p className={css.planTitle}>{planTitle}</p>
              <div className={css['test-questions']}>
                {planList.map((question, index) => (
                  <p
                    className={
                      correctAnswers[index] === userAnswers[index]
                        ? testQuestion !== index
                          ? clsx(
                              css['test-question'],
                              css['test-question-ready'],
                            )
                          : clsx(
                              css['test-question'],
                              css['test-question-ready-fill'],
                            )
                        : testQuestion !== index
                        ? clsx(css['test-question'], css['test-question-wrong'])
                        : clsx(
                            css['test-question'],
                            css['test-question-wrong-fill'],
                          )
                    }
                    onClick={() => handleTestNumberItemClick(index)}
                  >
                    {index + 1}
                  </p>
                ))}
              </div>
            </div>
          )}
      </div>
      <div className={css.buttons}>
        {isLessonPanel && (
          <>
            <Link href="/panel">
              <a>
                <RightPanelButton
                  title="Выйти"
                  size={ButtonSize.small}
                  currentState={ButtonState.default}
                />
              </a>
            </Link>
            <RightPanelButton
              // title="Следующий урок"
              title={buttonTitle}
              size={ButtonSize.large}
              currentState={
                isCurrentLessonDone ? ButtonState.success : ButtonState.disabled
              }
              handleClick={handleNextButtonClick}
            />
          </>
        )}
        {isStatPanel && (
          <RightPanelButton
            title={buttonTitle}
            size={ButtonSize.full}
            currentState={ButtonState.success}
            // handleClick={handleNextButtonClick}
            handleClick={() => navigateToLesson(buttonTitle)}
          />
        )}
        {isTestPanel && (
          <>
            <Link href="/panel">
              <a>
                <RightPanelButton
                  title="Выйти"
                  size={ButtonSize.small}
                  currentState={ButtonState.default}
                />
              </a>
            </Link>
            {isCurrentLessonDone ? (
              <RightPanelButton
                title={'Пройти заново'}
                size={ButtonSize.large}
                currentState={ButtonState.default}
                // currentState={
                //   isCurrentLessonDone ? ButtonState.success : ButtonState.disabled
                // }
                handleClick={handleTestRestartButton}
              />
            ) : (
              <RightPanelButton
                title={
                  planList?.length === testQuestion + 1
                    ? 'Завершить тест'
                    : 'Следующий вопрос'
                }
                size={ButtonSize.large}
                currentState={ButtonState.default}
                // currentState={
                //   isCurrentLessonDone ? ButtonState.success : ButtonState.disabled
                // }
                handleClick={handleNextButtonClick}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
