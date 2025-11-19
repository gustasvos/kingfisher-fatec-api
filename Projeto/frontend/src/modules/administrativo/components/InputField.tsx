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
  classNameLabel?: string
  classNameInput?: string
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  required = false,
  maxLength,
  value,
  onChange,
  classNameLabel,
  classNameInput
}) => {
  return (
    <div className="relative">
      <input
        className={`w-[300px] block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${classNameInput}`}
        type={type}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
      />
      <label className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ${classNameLabel}`}>
        {label}
      </label>
    </div>
  );
};

export default InputField;
