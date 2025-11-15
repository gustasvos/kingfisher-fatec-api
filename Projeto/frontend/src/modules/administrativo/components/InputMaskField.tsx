// InputMaskField.tsx

import React from 'react';
import { IMaskInput } from 'react-imask';

interface InputMaskFieldProps {
  label: string;
  classNameLabel?: string;
  mask: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onAccept: (value: string) => void;
  maxLength?: number; // <- ADICIONE ESSA LINHA
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  classNameInput?: string
}

const InputMaskField: React.FC<InputMaskFieldProps> = ({
  label,
  classNameLabel,
  mask,
  placeholder,
  required,
  value,
  onAccept,
  maxLength,
  style,
  classNameInput
}) => {
  return (
    <div className="relative w-[300px]">

      <IMaskInput
        mask={mask}
        placeholder={placeholder}
        required={required}
        value={value}
        onAccept={(value: any) => onAccept(value)}
        maxLength={maxLength} 
        className={`  peer
          w-[300px] block rounded-t-lg px-2.5 pb-2.5 pt-5
          text-sm text-gray-900 border-0 border-b-2 border-gray-300
          appearance-none focus:outline-none focus:ring-0
          focus:border-blue-600 ${classNameInput}`}
        style={style}
      />
      <label className={`absolute text-sm text-gray-500 duration-300 transform 
          top-4 z-10 origin-[0] start-2.5
          peer-focus:-translate-y-4
          peer-focus:scale-75
          peer-focus:text-blue-600
          ${value ? "-translate-y-4 scale-75" : "translate-y-0 scale-100"}
          ${classNameLabel}`}>
        {label}
      </label>
    </div>
  );
};

export default InputMaskField;
