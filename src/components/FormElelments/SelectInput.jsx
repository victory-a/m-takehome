import React from 'react';
import styles from './styles.module.scss';

const SelectInput = ({ options = [], defaultOption, onChange, ...props }) => {
  return (
    <select className={styles.selectInput} onChange={onChange} {...props}>
      {defaultOption && <option value=''>{defaultOption}</option>}
      {options.map((option, i) => (
        <option value={option} key={`options-${i}`}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
