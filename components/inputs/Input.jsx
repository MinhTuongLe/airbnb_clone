// Import necessary dependencies
import React from "react";
import { BiDollar } from "react-icons/bi";

function Input({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
}) {
  const emailPattern = /^\S+@\S+\.\S+$/;
  const phonePattern = /^\d{10}$/;

  const pattern =
    type === "email" ? emailPattern : type === "tel" ? phonePattern : null;

  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required, pattern })}
        placeholder=""
        type={type}
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
          formatPrice ? "pl-9" : "pl-4"
        } ${errors[id] ? "border-rose-500" : "border-neutral-300"} ${
          errors[id] ? "focus:border-rose-500" : "focus:outline-none"
        }`}
      />

      <label
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${
          formatPrice ? "left-9" : "left-4"
        } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          errors[id] ? "text-rose-500" : "text-zinc-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export default Input;
