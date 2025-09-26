// InputField.tsx

import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  required = false,
  maxLength,
  value,
  onChange
}) => {
  return (
    <div className="input">
      <label className="label">{label}</label>
      <input
        className="input-style"
        type={type}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
