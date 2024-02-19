
import React from "react";


interface InputProps {
  className?: string;
  placeholder?: string;
  type: string;
  name: string;
  value?: string;
  label?: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  className,
  placeholder,
  type,
  name,
  value,
  onChange,
  label,
  error,
}) => {
  console.log('error', error);
  return (
    <>
      {label === name && (
        <label className="text-black" htmlFor={label}>
          {label}
        </label>
      )}

      {/* <p className='text-black text-xl' >username</p> */}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        className={`${className}`}
        onChange={onChange}
      />

      {error && <p className="text-red-600">{error}</p>}
    </>
  );
};

export { Input };
