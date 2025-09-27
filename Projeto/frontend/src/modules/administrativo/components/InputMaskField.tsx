// InputMaskField.tsx

import React from 'react';
import { IMaskInput } from 'react-imask';

interface InputMaskFieldProps {
  label: string;
  mask: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onAccept: (value: string) => void;
  maxLength?: number; // <- ADICIONE ESSA LINHA
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

const InputMaskField: React.FC<InputMaskFieldProps> = ({
  label,
  mask,
  placeholder,
  required,
  value,
  onAccept,
  maxLength, // <- e aqui
}) => {
  return (
    <div className="input">
      <label className="label">{label}</label>
      <IMaskInput
        mask={mask}
        placeholder={placeholder}
        required={required}
        value={value}
        onAccept={(value: any) => onAccept(value)}
        maxLength={maxLength} // <- aqui também
        className="input-style"
      />
    </div>
  );
};

export default InputMaskField;
