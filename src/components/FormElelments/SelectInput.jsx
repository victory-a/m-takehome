import React from 'react';
import styles from './styles.module.scss';

const SelectInput = ({ options = [], onChange, ...props }) => {
  return (
    <select className={styles.selectInput} onChange={onChange} {...props}>
      <option value=''>Select Category</option>
      {options.map((option, i) => (
        <option value={option} key={`options-${i}`}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
