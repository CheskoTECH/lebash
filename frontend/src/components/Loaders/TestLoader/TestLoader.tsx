import React from 'react';
import { RotatingSquare } from 'react-loader-spinner';

import css from './TestLoader.module.css';

export const TestLoader = () => {
  //   const [loaderText, setLoaderText] = React.useState('Подготовка урока');
  const [loaderText, setLoaderText] = React.useState('Сохраняем ответ');

  React.useEffect(() => {
    setTimeout(() => {
      //   setLoaderText('Готовим окружение');
      setLoaderText('Проверка');
    }, 2000);
  }, []);
  // Подготовка урока
  // Подготовка окружения
  // Запуск урока (это не надо)
  return (
    <div className={css.main}>
      {/* <div className={css.wrapper}> */}
      <p className={css['loader-text']}>{loaderText}</p>
      <RotatingSquare
        height="200"
        width="200"
        color="#fff"
        ariaLabel="rotating-square-loading"
        strokeWidth="4"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
    // </div>
  );
};
