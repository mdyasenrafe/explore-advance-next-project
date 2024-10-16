import React from "react";
import { FormInputProps } from "./types";
import { Select, SelectItem } from "@nextui-org/select";
import { useFormContext } from "react-hook-form";

type TOption = {
  key: string;
  label: string;
};

interface FormSelectProps extends FormInputProps {
  options: TOption[];
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label = "Label",
  options,
  placeholder = "Enter value",
  fullWidth = true,
  required = false,
  type = "text",
  name,
  variant = "bordered",
  disabled,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Select
      {...register(name)}
      label={label}
      variant={variant}
      fullWidth={fullWidth}
      required={required}
      isInvalid={!!errors[name]}
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
      isDisabled={disabled}
    >
      {options.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
};
