import React from 'react';
import styles from './styles.module.scss';

const TextInput = ({ type = 'text', placeholder = 'Search', disabled = false, ...props }) => {
  return <input className={styles.textInput} type={type} placeholder={placeholder} {...props} />;
};

export default TextInput;
