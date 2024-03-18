import React from 'react';
import './DropDown.scss';

interface DropdownProps {
  label: string;
  name: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const DropDown: React.FC<DropdownProps> = ({
  label,
  name,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="dropdown">
      <label htmlFor={name} className="dropdown__name">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="dropdown__select"
        id={name}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
