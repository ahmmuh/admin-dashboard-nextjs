import React from "react";

function MainInput({
  label,
  type,
  name,
  placeholder,
  changeHandler,
  className,
  minLength,
  maxLength,
  exactLengthError,
  id,
  value,
}) {
  const valueLength = value ? value.toString().length : "";
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className={"block mb-2"}>
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={changeHandler}
        {...(minLength ? { minLength } : {})}
        {...(maxLength ? { maxLength } : {})}
        // disabled={maxLength > 4 || minLength < 4}
        className={className}
      />

      {exactLengthError && valueLength && valueLength !== 4 && (
        <p className="text-red-500 text-sm mt-1">
          Koden för att stämpla in/ut måste vara exakt 4 siffror.
        </p>
      )}
    </div>
  );
}

export default MainInput;
