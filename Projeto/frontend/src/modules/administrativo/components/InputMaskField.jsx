import { IMaskInput } from 'react-imask';

export default function InputMaskField({ label, mask, placeholder }) {
  return (
    <div className="input">
      <label className="label">{label}</label>
      <IMaskInput
        mask={mask}
        placeholder={placeholder}
        className="input-style"
      />
    </div>
  );
}