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
      <label className="mb-2 block text-xs sm:text-sm font-semibold text-[#4A3728]">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-base sm:text-lg text-[#B8860B]">
          {icon}
        </span>

        <input
          type={type}
          min={type === "number" ? "1" : min}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-[#D8C3A5] bg-white/20 py-2.5 sm:py-3 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm text-[#4A3728] outline-none transition-all duration-300 placeholder:text-xs focus:border-[#B8860B] focus:bg-white/30"
        />
      </div>
    </div>
  );
}

export default InputField;