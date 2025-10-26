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
}

const InputMaskField: React.FC<InputMaskFieldProps> = ({
  label,
  classNameLabel,
  mask,
  placeholder,
  required,
  value,
  onAccept,
  maxLength, // <- e aqui
  style
}) => {
  return (
    <div className="input">
      <label className={`label ${classNameLabel || ''}`}>{label}</label>
      <IMaskInput
        mask={mask}
        placeholder={placeholder}
        required={required}
        value={value}
        onAccept={(value: any) => onAccept(value)}
        maxLength={maxLength} // <- aqui também
        className="input-style"
        style={style}
      />
    </div>
  );
};

export default InputMaskField;
