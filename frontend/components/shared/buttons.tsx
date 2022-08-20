import React from 'react';
import styles from '../../assets/styles/components/buttons.module.css';

interface Props {
  text: string;
  onClick: () => void;
}

export const Button = (props: Props) => {

  const handleOnClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    props.onClick();
  }

  return (
    <button onClick={handleOnClick} className={styles.button}>{props.text}</button>
  );
}
