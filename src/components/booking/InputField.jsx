function InputField({
  icon,
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  min,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#4A3728]">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#B8860B]">
          {icon}
        </span>

        <input
          type={type}
          min={type === "number" ? "1" : min}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
         className="w-full rounded-xl border border-[#D8C3A5] bg-white/20 py-3 pl-12 pr-4 text-[#4A3728] outline-none"
        />
      </div>
    </div>
  );
}

export default InputField;