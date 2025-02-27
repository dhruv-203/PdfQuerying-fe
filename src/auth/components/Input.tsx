interface InputProps {
  label: string;
  placeholder: string;
  type: string;
  name: string;
}
function Input({ label, placeholder, type, name }: InputProps) {
  return (
    <div className="p-4 space-y-2 flex-1">
      <div className="label text-lg font-bold text-white">{label}</div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="w-full p-2 border-1 text-white placeholder:text-stone-300 border-stone-400 rounded-md"
      />
    </div>
  );
}

export default Input;
