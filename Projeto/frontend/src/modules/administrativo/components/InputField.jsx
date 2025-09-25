export default function InputField({ label, type, placeholder }) {
  return (
    <div className="input">
      <label className="label">{label}</label>
      <input type={type} placeholder={placeholder} className="input-style" />
    </div>
  );
}