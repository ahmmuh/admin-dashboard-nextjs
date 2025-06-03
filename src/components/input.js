import React from "react";

function MainInput({
  label,
  type,
  name,
  placeholder,
  changeHandler,
  className,
  id,
}) {
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
        placeholder={placeholder}
        onChange={changeHandler}
        className={className}
      />
    </div>
  );
}

export default MainInput;
