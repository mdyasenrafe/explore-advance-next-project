"use client";

import React from "react";
import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

interface FormInputProps {
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  required?: boolean;
  type?: string;
  name: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label = "Label",
  placeholder = "Enter value",
  fullWidth = true,
  required = false,
  type = "text",
  name,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Input
      {...register(name)}
      label={label}
      placeholder={placeholder}
      fullWidth={fullWidth}
      required={required}
      type={type}
      isInvalid={!!errors[name]}
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
      {...props}
    />
  );
};

export default FormInput;
