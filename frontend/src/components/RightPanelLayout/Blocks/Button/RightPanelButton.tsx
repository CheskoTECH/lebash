import React from 'react';
import css from './RightPanelButton.module.css';
import { clsx } from 'clsx';

export enum ButtonSize {
  large = 'large',
  small = 'small',
  full = 'full',
}

export enum ButtonState {
  default = 'default',
  success = 'success',
  disabled = 'disabled',
}

interface IRightPanelLayout {
  title?: string;
  size?: ButtonSize;
  currentState?: ButtonState;
  handleClick?: () => void;
}

export const RightPanelButton: React.FC<IRightPanelLayout> = ({
  title,
  size,
  currentState,
  handleClick,
}) => {
  const buttonSize =
    size === ButtonSize.large
      ? css.large
      : size === ButtonSize.small
      ? css.small
      : css.full;

  const buttonState =
    currentState === ButtonState.disabled
      ? css.disabled
      : currentState === ButtonState.success
      ? css.success
      : css.default;

  return (
    <button
      className={clsx(css.actionButton, buttonSize, buttonState)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};
