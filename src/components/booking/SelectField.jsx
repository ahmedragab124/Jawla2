function SelectField({
  icon,
  label,
  options,
  name,
  value,
  onChange,
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

        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full cursor-pointer rounded-xl border border-[#D8C3A5] bg-white/20 py-2.5 sm:py-3 pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm text-[#4A3728] backdrop-blur-md outline-none transition-all duration-300 focus:border-[#B8860B] focus:bg-white/30"
        >
          {options.map((item) => (
            <option
              key={item}
              value={item}
              className="bg-white text-[#4A3728]"
            >
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SelectField;