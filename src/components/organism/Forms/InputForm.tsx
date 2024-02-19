
import React, { FormEvent } from "react";

interface InputFromProps {
  className?: string;
  children: React.ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement | HTMLFormElement>) => void;
}

const InputForm: React.FC<InputFromProps> = ({
  className,
  children,
  onSubmit,
}) => {
  return (
    <form action="" className={`${className}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export { InputForm };
